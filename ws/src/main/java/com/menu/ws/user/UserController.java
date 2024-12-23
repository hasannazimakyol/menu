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
// import com.menu.ws.user.dto.UserProjection;
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

}
