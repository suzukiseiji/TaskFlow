# ─────────────────────────────────────────────
# Dockerfile — Frontend React (Vite)
# Build multi-stage: compila o React e serve com Nginx
# ─────────────────────────────────────────────

# ETAPA 1: Build do React
FROM node:22-alpine AS build

WORKDIR /app

# Instala dependências (aproveita cache)
COPY package*.json .
RUN npm ci

# Copia código e faz o build de produção
COPY . .
RUN npm run build

# ─────────────────────────────────────────────
# ETAPA 2: Servidor web Nginx (serve os arquivos estáticos)
FROM nginx:alpine

# Remove config padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia nossa configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copia os arquivos buildados do React
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
