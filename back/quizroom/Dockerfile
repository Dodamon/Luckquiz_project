FROM openjdk:11

WORKDIR /app

ARG JAR_FILE=build/libs/quizroom-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-XX:InitialRAMPercentage=50.0", "-XX:MaxRAMPercentage=50.0", "-jar", "-Duser.timezone=Asia/Seoul", "-Dspring.config.location=${SPRING_CONFIG_LOCATION}", "app.jar"]
