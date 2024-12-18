package com.menu.ws.user.exception;

import org.springframework.context.i18n.LocaleContextHolder;

import com.menu.ws.shared.Messages;

public class InvalidTokenException extends RuntimeException {

    public InvalidTokenException() {
        super(Messages.getMessageForLocale("menu.activate.user.invalid.token", LocaleContextHolder.getLocale()));
    }

}
