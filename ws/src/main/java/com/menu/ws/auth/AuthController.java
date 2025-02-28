package com.menu.ws.auth;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.menu.ws.auth.dto.AuthResponse;
import com.menu.ws.auth.dto.Credentials;
import com.menu.ws.shared.GenericMessage;
import com.menu.ws.user.dto.UserDTO;

import jakarta.validation.Valid;

@RestController
public class AuthController {

    @Autowired
    AuthService authService;

    @GetMapping("/api/v1/auth/me")
    ResponseEntity<AuthResponse> getAuthenticatedUser(
            @RequestHeader(name = "Authorization", required = false) String authorizationHeader,
            @CookieValue(name = "app-token", required = false) String cookieValue) {
        
        var tokenWithPrefix = authorizationHeader;
        if (cookieValue != null) {
            tokenWithPrefix = "Prefix " + cookieValue;
        }

        AuthResponse authResponse = new AuthResponse();
        authResponse.setUser(new UserDTO(authService.getCurrentUser(tokenWithPrefix)));
        return ResponseEntity.ok().body(authResponse);
    }

    @PostMapping("/api/v1/auth")
    ResponseEntity<AuthResponse> handleAuthentication(@Valid @RequestBody Credentials creds) {
        var authResponse = authService.authenticate(creds);
        var cookie = ResponseCookie.from("app-token", authResponse.getToken().getToken()).path("/")
                // .maxAge(creds.rememberMe() ? Duration.ofDays(30).toSeconds() : Duration.ofMinutes(30).toSeconds()) 
                .maxAge(creds.rememberMe() ? Duration.ofDays(30).toSeconds() : -1) 
                .httpOnly(true)
                .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(authResponse);
    }

    @PostMapping("/api/v1/logout")
    ResponseEntity<GenericMessage> handleLogout(
            @RequestHeader(name = "Authorization", required = false) String authorizationHeader,
            @CookieValue(name = "app-token", required = false) String cookieValue) {
        var tokenWithPrefix = authorizationHeader;
        if (cookieValue != null) {
            tokenWithPrefix = "Prefix " + cookieValue;
        }
        authService.logout(tokenWithPrefix);
        var cookie = ResponseCookie.from("app-token", "").path("/").maxAge(0).httpOnly(true).build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new GenericMessage("Logout success"));
    }

}
