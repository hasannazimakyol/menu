package com.menu.ws.configuration;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.menu.ws.user.User;
import com.menu.ws.user.UserService;

@Service
public class AppUserDetailsService implements UserDetailsService {

    @Autowired
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User inDB = userService.findByEmail(email);
        if (inDB == null) {
            throw new UsernameNotFoundException(email + " is not found");
        }

        return new UserDetails() {

            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return AuthorityUtils.createAuthorityList("ROLE_USER");
            }

            @Override
            public String getPassword() {
                return inDB.getPassword();
            }

            @Override
            public String getUsername() {
                return inDB.getUsername();
            }

        };

    }

}
