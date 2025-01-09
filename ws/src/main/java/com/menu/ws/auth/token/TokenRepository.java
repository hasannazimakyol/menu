package com.menu.ws.auth.token;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, String> {
    
}
