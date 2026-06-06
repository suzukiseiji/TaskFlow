# ─────────────────────────────────────────────
# Dockerfile — Backend Spring Boot
# Build multi-stage: compila e empacota em etapas separadas
# Resultado final: imagem leve só com o JAR
# ─────────────────────────────────────────────

# ETAPA 1: Build (usa Maven para compilar)
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build

WORKDIR /app

# Copia o pom.xml primeiro (aproveita cache do Docker para dependências)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copia o código-fonte e compila
COPY src ./src
RUN mvn package -DskipTests -B

# ─────────────────────────────────────────────
# ETAPA 2: Runtime (imagem final leve — só o JRE)
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copia só o JAR gerado na etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Porta que o Spring Boot vai escutar
EXPOSE 8080

# Comando de inicialização
ENTRYPOINT ["java", "-jar", "app.jar"]
