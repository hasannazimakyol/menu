package com.menu.ws.ingredient.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class IngredientCreate {
    @NotBlank(message = "{menu.constraint.ingredient.name.notblank}") @Size(min = 1, max = 255) 
    private String name;
    private List<IngredientTranslationDTO> translations;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<IngredientTranslationDTO> getTranslations() {
        return translations;
    }

    public void setTranslations(List<IngredientTranslationDTO> translations) {
        this.translations = translations;
    }
}
