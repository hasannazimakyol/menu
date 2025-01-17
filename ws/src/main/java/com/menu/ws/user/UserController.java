package com.menu.ws.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
// import com.menu.ws.user.dto.UserProjection;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.menu.ws.configuration.CurrentUser;
import com.menu.ws.shared.GenericMessage;
import com.menu.ws.shared.Messages;
import com.menu.ws.user.dto.UserCreate;
import com.menu.ws.user.dto.UserDTO;
import com.menu.ws.user.dto.PasswordResetRequest;
import com.menu.ws.user.dto.PasswordUpdate;
import com.menu.ws.user.dto.UserUpdate;

import jakarta.validation.Valid;

@RestController
public class UserController {

    @Autowired
    UserService userService;

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
    Page<UserDTO> getUsers(Pageable pageable, @AuthenticationPrincipal CurrentUser currentUser) {
        return userService.getUsers(pageable, currentUser).map(UserDTO::new);
    }

    @GetMapping("/api/v1/users/{id}")
    UserDTO getUserById(@PathVariable long id) {
        return new UserDTO(userService.getUser(id));
    }

    @PutMapping("/api/v1/users/{id}")
    @PreAuthorize("#id == principal.id")
    UserDTO updateUser(@PathVariable long id, @Valid @RequestBody UserUpdate userUpdate) {
        return new UserDTO(userService.updateUser(id, userUpdate));
    }

    @DeleteMapping("/api/v1/users/{id}")
    @PreAuthorize("#id == principal.id")
    GenericMessage deleteUser(@PathVariable long id) {
        userService.deleteUser(id);
        String message = Messages.getMessageForLocale("menu.delete.user.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @PostMapping("api/v1/users/password-reset")
    GenericMessage passwordResetRequest(@Valid @RequestBody PasswordResetRequest passwordResetRequest) {
        userService.handleResetRequest(passwordResetRequest);
        String message = Messages.getMessageForLocale("menu.password.reset.user.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @PatchMapping("api/v1/users/{token}/password")
    GenericMessage setPassword(@PathVariable String token, @Valid @RequestBody PasswordUpdate passwordUpdate) {
        userService.updatePassword(token, passwordUpdate);
        String message = Messages.getMessageForLocale("menu.activate.user.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }
}
