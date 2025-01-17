package com.menu.ws.auth.exception;

import org.springframework.context.i18n.LocaleContextHolder;

import com.menu.ws.shared.Messages;

public class AuthenticationException extends RuntimeException {

    public AuthenticationException() {
        super(Messages.getMessageForLocale("menu.auth.invalid.credentials", LocaleContextHolder.getLocale()));
    }
}
