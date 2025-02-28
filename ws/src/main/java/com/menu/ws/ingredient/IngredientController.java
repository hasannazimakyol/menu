package com.menu.ws.ingredient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.menu.ws.ingredient.dto.IngredientCreate;
import com.menu.ws.ingredient.dto.IngredientDTO;
import com.menu.ws.shared.GenericMessage;
import com.menu.ws.shared.Messages;

import jakarta.validation.Valid;

@RestController
@PreAuthorize("hasRole('ADMIN')")
public class IngredientController {

    @Autowired
    IngredientService ingredientService;

    @PostMapping("/api/v1/ingredients")
    GenericMessage createIngredient(@Valid @RequestBody IngredientCreate ingredientCreate) {
        ingredientService.addIngredient(ingredientCreate);
        String message = Messages.getMessageForLocale("menu.create.ingredient.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @GetMapping("/api/v1/ingredients")
    Page<IngredientDTO> getIngredients(Pageable pageable,
            @RequestHeader(value = "Accept-Language", defaultValue = "en") String language,
            @RequestParam(required = false) String name) {
        Page<Ingredient> ingredients = ingredientService.getIngredients(pageable, name);
        return ingredients.map(ingredient -> {
            String translation = ingredient.getTranslations().stream()
                    .filter(t -> t.getLanguage().equals(language))
                    .map(IngredientTranslation::getTranslatedName)
                    .findFirst()
                    .orElse("N/A");
            return new IngredientDTO(ingredient.getId(), ingredient.getName(), translation);
        });
    }

    @DeleteMapping("/api/v1/ingredients/{id}")
    GenericMessage deleteIngredient(@PathVariable long id) {
        Ingredient ingredient = ingredientService.getIngredient(id);
        ingredientService.deleteIngredient(id);
        String message = Messages.getMessageForLocale("menu.delete.ingredient.success.message",
                LocaleContextHolder.getLocale(), ingredient.getName());
        return new GenericMessage(message);
    }
}
