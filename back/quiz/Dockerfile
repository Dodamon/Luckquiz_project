FROM openjdk:11-jdk-slim as builder

# env
ENV SPRING_CONFIG_LOCATION=<path-to-file>
# env finish

ARG JAR_FILE=build/libs/*.jar

COPY --from=builder build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar", "-Duser.timezone=Asia/Seoul", "-Dspring.config.location=${SPRING_CONFIG_LOCATION}", "/app.jar"]
