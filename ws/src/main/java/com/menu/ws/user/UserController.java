package com.menu.ws.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import com.menu.ws.error.ApiError;
import com.menu.ws.shared.GenericMessage;
import com.menu.ws.shared.Messages;
import com.menu.ws.user.dto.UserCreate;
import com.menu.ws.user.dto.UserDTO;
import com.menu.ws.user.dto.UserProjection;
import com.menu.ws.user.exception.ActivationNotificationException;
import com.menu.ws.user.exception.InvalidTokenException;
import com.menu.ws.user.exception.NotFoundException;
import com.menu.ws.user.exception.NotUniqueEmailException;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    MessageSource messageSource;

    @PostMapping("/api/v1/users")
    GenericMessage createUser(@Valid @RequestBody UserCreate userCreate) {
        userService.save(userCreate.toUser());
        String message = Messages.getMessageForLocale("menu.create.user.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @PatchMapping("api/v1/users/{token}/active")
    GenericMessage activateUser(@PathVariable String token) {
        userService.activateUser(token);
        String message = Messages.getMessageForLocale("menu.activate.user.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @GetMapping("/api/v1/users")
    // Page<User> getUsers(@RequestParam(defaultValue = "0") int page,
    // @RequestParam(defaultValue = "10") int size) {
    // Page<UserProjection> getUsers(Pageable pageable) {
    Page<UserDTO> getUsers(Pageable pageable) {
        return userService.getUsers(pageable).map(UserDTO::new);
    }

    @GetMapping("/api/v1/users/{id}")
    UserDTO getUserById(@PathVariable long id) {
        return new UserDTO(userService.getUser(id));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiError> handleMethodArgNotValidEx(MethodArgumentNotValidException exception) {
        ApiError apiError = new ApiError();
        apiError.setPath("api/v1/users");
        String message = Messages.getMessageForLocale("menu.error.validation", LocaleContextHolder.getLocale());
        apiError.setMessage(message);
        apiError.setStatus(400);
        Map<String, String> validationErrors = new HashMap<>();
        for (var fieldError : exception.getBindingResult().getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        validationErrors = exception.getBindingResult().getFieldErrors().stream().collect(Collectors
                .toMap(FieldError::getField, FieldError::getDefaultMessage, (existing, replacing) -> existing));
        apiError.setValidationErrors(validationErrors);
        return ResponseEntity.badRequest().body(apiError);
    }

    @ExceptionHandler(NotUniqueEmailException.class)
    ResponseEntity<ApiError> handleNotUniqueEmailException(NotUniqueEmailException exception) {
        ApiError apiError = new ApiError();
        apiError.setPath("api/v1/users");
        apiError.setMessage(exception.getMessage());
        apiError.setStatus(400);
        apiError.setValidationErrors(exception.getValidationErrors());
        return ResponseEntity.badRequest().body(apiError);
    }

    @ExceptionHandler(ActivationNotificationException.class)
    ResponseEntity<ApiError> handleActivationNotificationException(ActivationNotificationException exception) {
        ApiError apiError = new ApiError();
        apiError.setPath("api/v1/users");
        apiError.setMessage(exception.getMessage());
        apiError.setStatus(502);
        return ResponseEntity.status(502).body(apiError);
    }

    @ExceptionHandler(InvalidTokenException.class)
    ResponseEntity<ApiError> handleInvalidTokenException(InvalidTokenException exception, HttpServletRequest request) {
        ApiError apiError = new ApiError();
        apiError.setPath(request.getRequestURI());
        apiError.setMessage(exception.getMessage());
        apiError.setStatus(400);
        return ResponseEntity.status(400).body(apiError);
    }

    @ExceptionHandler(NotFoundException.class)
    ResponseEntity<ApiError> handleNotFoundException(NotFoundException exception, HttpServletRequest request) {
        ApiError apiError = new ApiError();
        apiError.setPath(request.getRequestURI());
        apiError.setMessage(exception.getMessage());
        apiError.setStatus(404);
        return ResponseEntity.status(404).body(apiError);
    }

    // @ExceptionHandler(TransactionSystemException.class)
    // ResponseEntity<ApiError>
    // handleTransactionSystemException(TransactionSystemException exception) {
    // return ResponseEntity.badRequest().body(new ApiError());
    // }

}
