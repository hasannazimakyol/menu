package com.menu.ws.user.dto;

import com.menu.ws.user.User;
import com.menu.ws.user.validation.UniqueEmail;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserCreate(
        @NotBlank(message = "{menu.constraint.username.notblank}") @Size(min = 4, max = 255) String username,

        @NotBlank @Email @UniqueEmail String email,

        @Size(min = 8, max = 255) @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$") String password) {

    public User toUser() {
        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(password);
        return user;
    }
}
