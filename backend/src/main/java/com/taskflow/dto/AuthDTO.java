package com.taskflow.dto;

import com.taskflow.entity.Task;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalDateTime;

// Records Java = DTOs imutáveis sem Lombok
// O compilador gera: construtor, getters (name()), equals, hashCode, toString

public class AuthDTO {

    public record RegisterRequest(
        @NotBlank(message = "Nome é obrigatório") String name,
        @NotBlank @Email(message = "Email inválido") String email,
        @NotBlank @Size(min = 6, message = "Mínimo 6 caracteres") String password
    ) {}

    public record LoginRequest(
        @NotBlank @Email(message = "Email inválido") String email,
        @NotBlank String password
    ) {}

    public record AuthResponse(
        String token,
        String name,
        String email
    ) {}
}
