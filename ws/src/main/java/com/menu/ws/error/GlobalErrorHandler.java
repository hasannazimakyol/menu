package com.menu.ws.error;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalErrorHandler extends ResponseEntityExceptionHandler {

    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler({ DisabledException.class, AccessDeniedException.class, BadCredentialsException.class })
    ResponseEntity<?> handleException(Exception exception, HttpServletRequest request) {

        ApiError error = new ApiError();
        error.setMessage(exception.getMessage());
        // error.setMessage(messageSource.getMessage("menu.spring.security.access.denied",
        // null, request.getLocale()));
        error.setPath(request.getRequestURI());
        if (exception instanceof DisabledException) {
            error.setStatus(401);
        } else if (exception instanceof AccessDeniedException) {
            error.setStatus(403);
            error.setMessage(messageSource.getMessage("menu.spring.security.access.denied", null, request.getLocale()));
        } else if (exception instanceof BadCredentialsException) {
            error.setStatus(401);
        }
        return ResponseEntity.status(401).body(error);
    }

}
