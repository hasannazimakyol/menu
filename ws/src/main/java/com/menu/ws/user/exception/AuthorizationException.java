package com.menu.ws.user.exception;

import org.springframework.context.i18n.LocaleContextHolder;

import com.menu.ws.shared.Messages;

public class AuthorizationException extends RuntimeException {
    public AuthorizationException() {
        super(Messages.getMessageForLocale("menu.update.user.invalid.token", LocaleContextHolder.getLocale()));
    }
}
