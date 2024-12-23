package com.menu.ws.auth.token;

import com.menu.ws.auth.dto.Credentials;
import com.menu.ws.user.User;

public interface TokenService {

    public Token createToken(User user, Credentials creds);

    public User verifyToken(String authorizationHeader);
    
}
