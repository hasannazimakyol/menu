package com.menu.ws.language;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class LanguageSetup {

    @Autowired
    private LanguageRepository languageRepository;

    @PostConstruct
    public void init() {
        // List<Language> predefinedLanguages = List.of(
        //     new Language("en", "English"),
        //     new Language("tr", "Türkçe")
        // );
    
        // for (Language lang : predefinedLanguages) {
        //     if (!languageRepository.existsByCode(lang.getCode())) {
        //         languageRepository.save(lang);
        //     }
        // }

        if (!languageRepository.existsByCode("en")) {
            languageRepository.save(new Language("en", "English"));
        }

        if (!languageRepository.existsByCode("tr")) {
            languageRepository.save(new Language("tr", "Türkçe"));
        }
    }
}
