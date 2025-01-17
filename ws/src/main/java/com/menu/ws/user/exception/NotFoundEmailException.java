package com.menu.ws.user.exception;

import java.util.Collections;
import java.util.Map;

import org.springframework.context.i18n.LocaleContextHolder;

import com.menu.ws.shared.Messages;

public class NotFoundEmailException extends RuntimeException {
    public NotFoundEmailException() {
        super(Messages.getMessageForLocale("menu.error.validation", LocaleContextHolder.getLocale()));
    }

    public Map<String, String> getValidationErrors() {
        return Collections.singletonMap("email",
                Messages.getMessageForLocale("menu.constraint.email.notunique", LocaleContextHolder.getLocale()));
    }

}
