package com.menu.ws.ingredient.dto;

import jakarta.validation.constraints.NotBlank;

public class IngredientTranslationDTO {
    @NotBlank(message = "{menu.constraint.ingredient.language.notblank}")
    private String language;
    @NotBlank(message = "{menu.constraint.ingredient.translate.notblank}")
    private String translatedName;

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getTranslatedName() {
        return translatedName;
    }

    public void setTranslatedName(String translatedName) {
        this.translatedName = translatedName;
    }
}
