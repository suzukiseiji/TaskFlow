package com.taskflow.repository;

import com.taskflow.entity.Task;
import com.taskflow.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

    // Busca tasks de um usuário com paginação
    // Page<Task> = resultado paginado com metadados (total, páginas, etc.)
    Page<Task> findByOwner(User owner, Pageable pageable);

    // Busca com filtro de título (case-insensitive)
    // SQL: WHERE user_id = ? AND LOWER(title) LIKE LOWER('%?%')
    Page<Task> findByOwnerAndTitleContainingIgnoreCase(User owner, String title, Pageable pageable);
}
