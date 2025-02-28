package com.menu.ws.ingredient.exception;

import java.util.Collections;
import java.util.Map;

import org.springframework.context.i18n.LocaleContextHolder;

import com.menu.ws.shared.Messages;

public class NotUniqueIngredientNameException extends RuntimeException {

    public NotUniqueIngredientNameException() {
        super(Messages.getMessageForLocale("menu.error.validation", LocaleContextHolder.getLocale()));
    }

    public Map<String, String> getValidationErrors() {
        return Collections.singletonMap("ingredient",
                Messages.getMessageForLocale("menu.constraint.ingredient.notunique", LocaleContextHolder.getLocale()));
    }
}
