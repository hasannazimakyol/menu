package com.menu.ws.user.validation;

import org.springframework.beans.factory.annotation.Autowired;

import com.menu.ws.user.User;
import com.menu.ws.user.UserRepository;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        User inDB = userRepository.findByEmail(value);
        return inDB == null;
    }
    
}
