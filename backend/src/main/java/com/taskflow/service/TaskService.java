package com.taskflow.service;

import com.taskflow.dto.TaskDTO.TaskRequest;
import com.taskflow.dto.TaskDTO.TaskResponse;
import com.taskflow.entity.Task;
import com.taskflow.entity.User;
import com.taskflow.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    // Converte a Entidade do Banco (Task) para o DTO de Saída (TaskResponse)
    private TaskResponse mapToResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getPriority(),
                task.getDueDate(),
                task.getCreatedAt(),
                task.getUpdatedAt(),
                task.getOwner().getName()
        );
    }

    public Page<TaskResponse> findAllTasks(User owner, String search, Pageable pageable) {
        Page<Task> tasks;
        if (search != null && !search.trim().isEmpty()) {
            tasks = taskRepository.findByOwnerAndTitleContainingIgnoreCase(owner, search, pageable);
        } else {
            tasks = taskRepository.findByOwner(owner, pageable);
        }
        return tasks.map(this::mapToResponse); // Converte todos da lista
    }

    public TaskResponse createTask(User owner, TaskRequest request) {
        Task task = Task.builder()
                .title(request.title())
                .description(request.description())
                .status(request.status() != null ? request.status() : Task.Status.TODO)
                .priority(request.priority() != null ? request.priority() : Task.Priority.MEDIUM)
                .dueDate(request.dueDate())
                .owner(owner) // Vincula a tarefa a quem está criando!
                .build();

        Task savedTask = taskRepository.save(task);
        return mapToResponse(savedTask);
    }

    public TaskResponse updateTask(User owner, Long taskId, TaskRequest request) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Tarefa não encontrada."));

        // Segurança Extra: Garantir que o usuário atual é o dono da tarefa
        if (!task.getOwner().getId().equals(owner.getId())) {
            throw new IllegalArgumentException("Acesso negado. Você não é dono desta tarefa.");
        }

        task.setTitle(request.title());
        task.setDescription(request.description());
        if (request.status() != null) task.setStatus(request.status());
        if (request.priority() != null) task.setPriority(request.priority());
        task.setDueDate(request.dueDate());

        Task updatedTask = taskRepository.save(task);
        return mapToResponse(updatedTask);
    }

    public void deleteTask(User owner, Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Tarefa não encontrada."));

        if (!task.getOwner().getId().equals(owner.getId())) {
            throw new IllegalArgumentException("Acesso negado. Você não é dono desta tarefa.");
        }

        taskRepository.delete(task);
    }
}
