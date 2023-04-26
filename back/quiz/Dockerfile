FROM adoptopenjdk/openjdk11

# env
ENV SPRING_CONFIG_LOCATION=<path-to-file>
# env finish

#COPY gradlew .
#COPY gradle gradle
#COPY build.gradle .
#COPY settings.gradle .
#COPY src src
#RUN chmod +x ./gradlew
#RUN ./gradlew clean bootJar

#FROM adoptopenjdk/openjdk11
ARG JAR_FILE=/build/libs/quiz-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar", "-Dspring.config.location=${SPRING_CONFIG_LOCATION}", "/app.jar"]
