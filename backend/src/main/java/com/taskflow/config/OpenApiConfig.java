package com.taskflow.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "TaskFlow API",
                version = "1.0",
                description = "Documentação da API REST do Gerenciador de Tarefas"
        ),
        security = @SecurityRequirement(name = "bearerAuth") // Aplica a segurança para todas as rotas
)
@SecurityScheme(
        name = "bearerAuth",
        description = "Copie e cole o token JWT aqui (NÃO precisa escrever 'Bearer ' antes, apenas cole o código).",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
}
