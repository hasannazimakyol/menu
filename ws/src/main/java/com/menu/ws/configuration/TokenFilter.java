package com.menu.ws.configuration;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import com.menu.ws.auth.token.TokenService;
import com.menu.ws.user.User;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class TokenFilter extends OncePerRequestFilter {

    @Autowired
    TokenService tokenService;

    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver exceptionResolver;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null) {
            User user = tokenService.verifyToken(authorizationHeader);
            if (user != null) {
                if (!user.isActive()) {
                    exceptionResolver.resolveException(request, response, null,
                            new DisabledException("User is disabled"));
                    // throw new DisabledException("User is disabled"); 2nd
                    // ApiError apiError = new ApiError(); 3nd
                    // apiError.setStatus(401);
                    // apiError.setMessage("User is disabled");
                    // apiError.setPath(request.getRequestURI());
                    // ObjectMapper objectMapper = new ObjectMapper();

                    // response.setStatus(401);
                    // response.setContentType("application/json");
                    // OutputStream outputStream = response.getOutputStream();
                    // objectMapper.writeValue(outputStream, apiError);
                    // outputStream.flush();
                    return;
                }
                CurrentUser currentUser = new CurrentUser(user);
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        currentUser, null, currentUser.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        filterChain.doFilter(request, response);
    }

}
