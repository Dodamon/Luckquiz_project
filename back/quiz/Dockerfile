FROM openjdk:11-jdk-slim

# env
ENV SPRING_CONFIG_LOCATION=<path-to-file>
# env finish

ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar", "-Duser.timezone=Asia/Seoul", "-Dspring.config.location=${SPRING_CONFIG_LOCATION}", "/app.jar"]
