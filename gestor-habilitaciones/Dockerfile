# Usa una imagen oficial de Java 17
FROM eclipse-temurin:17-jdk

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia tu JAR generado al contenedor
COPY target/gestor-habilitaciones-0.0.1-SNAPSHOT.jar app.jar

# Expón el puerto 8080 (Spring Boot usa 8080 por defecto)
EXPOSE 8080

# Comando de inicio
ENTRYPOINT ["java", "-jar", "app.jar"]
