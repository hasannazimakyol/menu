package com.menu.ws.user.exception;

import org.springframework.context.i18n.LocaleContextHolder;

import com.menu.ws.shared.Messages;

public class NotFoundException extends RuntimeException{

    public NotFoundException(long id){
        super(Messages.getMessageForLocale("menu.user.not.found", LocaleContextHolder.getLocale(), id));
    }
    
}
