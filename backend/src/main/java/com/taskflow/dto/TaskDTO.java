package com.taskflow.dto;

import com.taskflow.entity.Task;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class TaskDTO {

    // O que o frontend ENVIA para criar/editar uma task
    public record TaskRequest(
        @NotBlank(message = "Título é obrigatório") String title,
        String description,
        Task.Status status,
        Task.Priority priority,
        LocalDate dueDate
    ) {}

    // O que o frontend RECEBE — nunca retorne a Entity direto!
    // Aqui controlamos exatamente o que expor na API
    public record TaskResponse(
        Long id,
        String title,
        String description,
        Task.Status status,
        Task.Priority priority,
        LocalDate dueDate,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        String ownerName  // só o nome, não o objeto User inteiro
    ) {}
}
