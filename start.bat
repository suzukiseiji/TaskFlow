@echo off
echo =========================================
echo       Iniciando o Projeto TaskFlow
echo =========================================
echo.

echo [1/3] Subindo o Banco de Dados (Docker)...
docker compose up -d
echo Banco de dados iniciado!
echo.

echo [2/3] Iniciando o Backend (Spring Boot)...
:: O comando 'start' abre uma nova janela do terminal
:: O 'cmd /k' garante que a nova janela não feche se der erro
start "TaskFlow Backend" cmd /k "cd backend && .\mvnw.cmd spring-boot:run"
echo Backend abrindo em uma nova janela...
echo.

echo [3/3] Iniciando o Frontend (Vite/React)...
start "TaskFlow Frontend" cmd /k "cd frontend && npm run dev"
echo Frontend abrindo em uma nova janela...
echo.

echo =========================================
echo  Ambiente iniciado com sucesso!
echo  O Frontend estara em: http://localhost:5173
echo =========================================
pause
