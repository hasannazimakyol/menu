package com.menu.ws.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.menu.ws.auth.dto.AuthResponse;
import com.menu.ws.auth.dto.Credentials;
import com.menu.ws.auth.exception.AuthenticationException;
import com.menu.ws.auth.token.Token;
import com.menu.ws.auth.token.TokenService;
import com.menu.ws.user.User;
import com.menu.ws.user.UserService;
import com.menu.ws.user.dto.UserDTO;

@Service
public class AuthService {

    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    TokenService tokenService;

    public AuthResponse authenticate(Credentials creds) {
        User inDB = userService.findByEmail(creds.email());
        if (inDB == null)
            throw new AuthenticationException();
        if (!passwordEncoder.matches(creds.password(), inDB.getPassword()))
            throw new AuthenticationException();

        Token token = tokenService.createToken(inDB, creds);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(token);
        authResponse.setUser(new UserDTO(inDB));
        return authResponse;
    }

}
