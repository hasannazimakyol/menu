package com.menu.ws.user.dto;

import jakarta.validation.constraints.Email;

public record AssignRole(
    @Email String email, String roleName) {
}
