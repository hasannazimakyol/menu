package com.menu.ws.ingredient.dto;

public class IngredientDTO {

    long id;
    String name;
    String translatedName;

    public IngredientDTO(Long id, String name, String translatedName) {
        this.id = id;
        this.name = name;
        this.translatedName = translatedName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTranslatedName() {
        return translatedName;
    }

    public void setTranslatedName(String translatedName) {
        this.translatedName = translatedName;
    }
}
