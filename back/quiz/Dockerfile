FROM openjdk:11

WORKDIR /app

ARG JAR_FILE=build/libs/quiz-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar", "-Duser.timezone=Asia/Seoul", "-Dspring.config.location=${SPRING_CONFIG_LOCATION}", "app.jar"]
