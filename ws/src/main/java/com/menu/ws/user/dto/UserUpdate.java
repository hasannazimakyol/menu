package com.menu.ws.user.dto;

import com.menu.ws.user.validation.FileType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserUpdate(

                @NotBlank(message = "{menu.constraint.username.notblank}") @Size(min = 4, max = 255) 
                String username,

                @FileType(types = { "jpeg", "png" })
                String image

) {
}
