package com.menu.ws.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.menu.ws.auth.token.TokenService;
import com.menu.ws.shared.GenericMessage;
import com.menu.ws.shared.Messages;
import com.menu.ws.user.dto.UserCreate;
import com.menu.ws.user.dto.UserDTO;
import com.menu.ws.user.dto.UserUpdate;
import com.menu.ws.user.exception.AuthorizationException;

// import com.menu.ws.user.dto.UserProjection;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    TokenService tokenService;

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
    Page<UserDTO> getUsers(Pageable pageable,
            @RequestHeader(name = "Authorization", required = false) String authorizationHeader) {
        var loggedInUser = tokenService.verifyToken(authorizationHeader);
        return userService.getUsers(pageable, loggedInUser).map(UserDTO::new);
    }

    @GetMapping("/api/v1/users/{id}")
    UserDTO getUserById(@PathVariable long id) {
        return new UserDTO(userService.getUser(id));
    }

    @PutMapping("/api/v1/users/{id}")
    public UserDTO updateUser(@PathVariable long id, @Valid @RequestBody UserUpdate userUpdate,
            @RequestHeader(name = "Authorization", required = false) String authorizationHeader) {
        var loggedInUser = tokenService.verifyToken(authorizationHeader);
        if (loggedInUser == null || loggedInUser.getId() != id) {
            throw new AuthorizationException();
        }
        return new UserDTO(userService.updateUser(id, userUpdate));
    }

}
