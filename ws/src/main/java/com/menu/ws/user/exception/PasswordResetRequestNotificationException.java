package com.menu.ws.user.exception;

import org.springframework.context.i18n.LocaleContextHolder;

import com.menu.ws.shared.Messages;

public class PasswordResetRequestNotificationException extends RuntimeException {
    public PasswordResetRequestNotificationException() {
        super(Messages.getMessageForLocale("menu.password.reset.request.user.failure",
                LocaleContextHolder.getLocale()));
    }
}
