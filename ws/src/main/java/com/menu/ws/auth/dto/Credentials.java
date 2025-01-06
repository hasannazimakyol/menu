package com.menu.ws.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record Credentials(@NotBlank @Email String email, @NotBlank String password) {

}
