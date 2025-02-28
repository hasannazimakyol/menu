package com.menu.ws.language;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LanguageController {
    @Autowired
    private LanguageService languageService;

    @GetMapping("/api/v1/languages")
    List<Language> getAllLanguages() {
        return languageService.getAllLanguages();
    }
}
