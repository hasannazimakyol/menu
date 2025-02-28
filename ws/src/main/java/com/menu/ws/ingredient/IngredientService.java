package com.menu.ws.ingredient;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.menu.ws.ingredient.dto.IngredientCreate;
import com.menu.ws.ingredient.dto.IngredientTranslationDTO;
import com.menu.ws.ingredient.exception.NotUniqueIngredientNameException;
import com.menu.ws.user.exception.NotFoundException;

import jakarta.transaction.Transactional;

@Service
public class IngredientService {
    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private IngredientTranslationRepository translationRepository;

    @Transactional
    public void addIngredient(IngredientCreate ingredientCreate) {
        try {
            Ingredient ingredient = new Ingredient();
            ingredient.setName(formatIngredientName(ingredientCreate.getName()));
            ingredient = ingredientRepository.save(ingredient);

            List<IngredientTranslation> translations = new ArrayList<>();
            for (IngredientTranslationDTO t : ingredientCreate.getTranslations()) {
                IngredientTranslation translation = new IngredientTranslation();
                translation.setIngredient(ingredient);
                translation.setLanguage(t.getLanguage());
                translation.setTranslatedName(capitalizeWords(t.getTranslatedName()));
                translations.add(translation);
            }
            // List<IngredientTranslation> translations =
            // ingredientCreate.getTranslations().stream().map(t -> {
            // IngredientTranslation translation = new IngredientTranslation();
            // translation.setIngredient(ingredient);
            // translation.setLanguage(t.getLanguage());
            // translation.setTranslation(t.getTranslation());
            // return translation;
            // }).collect(Collectors.toList());

            translationRepository.saveAll(translations);
        } catch (DataIntegrityViolationException e) {
            throw new NotUniqueIngredientNameException();
        }

    }

    public String formatIngredientName(String name) {
        return name.toLowerCase().replace(" ", "_");
    }

    public String capitalizeWords(String input) {
        String[] words = input.split("\s");
        StringBuilder result = new StringBuilder();
        for (String word : words) {
            result.append(Character.toTitleCase(word.charAt(0)))
                    .append(word.substring(1))
                    .append(" ");
        }
        return result.toString().trim();
    }

    public Page<Ingredient> getIngredients(Pageable pageable, String name) {
        if (name == null || name.isEmpty() || name.isBlank()) {
            return ingredientRepository.findAll(pageable);
        }
        return ingredientRepository.findByNameStartingWithIgnoreCase(name, pageable);
    }

    public void deleteIngredient(long id) {
        Ingredient inDB = getIngredient(id);
        ingredientRepository.delete(inDB);
    }

    public Ingredient getIngredient(long id) {
        return ingredientRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
    }
}