package com.menu.ws.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.menu.ws.auth.dto.AuthResponse;
import com.menu.ws.auth.dto.Credentials;
import com.menu.ws.auth.exception.AuthenticationException;
import com.menu.ws.error.ApiError;

import jakarta.validation.Valid;

@RestController
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/api/v1/auth")
    AuthResponse handleAuthentication(@Valid @RequestBody Credentials creds) {
        return authService.authenticate(creds);
    }

    @ExceptionHandler(AuthenticationException.class)
    ResponseEntity<?> handleAuthenticationException(AuthenticationException exception) {
        ApiError error = new ApiError();
        error.setPath("/api/v1/auth");
        error.setStatus(401);
        error.setMessage(exception.getMessage());
        return ResponseEntity.status(401).body(error);
    }

}
