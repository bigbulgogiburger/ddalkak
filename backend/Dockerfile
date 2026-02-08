# Stage 1: Build
FROM gradle:8.5-jdk21 AS builder

WORKDIR /build

COPY build.gradle settings.gradle* ./
COPY src ./src

RUN gradle build -x test --no-daemon

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

RUN addgroup -S ddalkak && adduser -S ddalkak -G ddalkak

COPY --from=builder /build/build/libs/*.jar app.jar

RUN chown -R ddalkak:ddalkak /app

USER ddalkak

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
