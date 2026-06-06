# TaskFlow

Sistema de gerenciamento de tarefas — projeto fullstack de aprendizado.

## Stack
- **Backend**: Java 17 + Spring Boot + PostgreSQL
- **Frontend**: React + Vite + TailwindCSS
- **Infra**: Docker + Docker Compose + RabbitMQ

## Como rodar

### Subir só a infraestrutura (banco + pgAdmin + RabbitMQ)
```bash
docker compose up -d
```

### Subir tudo (incluindo backend e frontend em Docker)
```bash
docker compose --profile full up -d
```

### Desenvolvimento local (recomendado para aprender)
```bash
# Terminal 1 — banco + extras
docker compose up -d

# Terminal 2 — backend
cd backend
./mvnw spring-boot:run

# Terminal 3 — frontend
cd frontend
npm run dev
```

## Serviços

| Serviço | URL |
|---|---|
| API (Spring Boot) | http://localhost:8080 |
| Swagger | http://localhost:8080/swagger-ui.html |
| Frontend (dev) | http://localhost:5173 |
| pgAdmin | http://localhost:5050 |
| RabbitMQ Painel | http://localhost:15672 |

### Credenciais (dev)
- **PostgreSQL**: `taskflow` / `taskflow123`
- **pgAdmin**: `admin@taskflow.com` / `admin123`
- **RabbitMQ**: `taskflow` / `taskflow123`
