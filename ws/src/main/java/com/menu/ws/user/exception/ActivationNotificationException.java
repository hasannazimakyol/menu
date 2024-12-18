package com.menu.ws.user.exception;

import org.springframework.context.i18n.LocaleContextHolder;

import com.menu.ws.shared.Messages;

public class ActivationNotificationException extends RuntimeException {
    public ActivationNotificationException() {
        super(Messages.getMessageForLocale("menu.create.user.email.failure", LocaleContextHolder.getLocale()));
    }
}
