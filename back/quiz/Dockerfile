FROM adoptopenjdk/openjdk11 as builder

# env
ENV SPRING_CONFIG_LOCATION=<path-to-file>
# env finish

COPY quiz/gradlew .
COPY quiz/gradle gradle
COPY quiz/build.gradle .
COPY quiz/settings.gradle .
COPY quiz/src src
RUN chmod +x ./gradlew
RUN ./gradlew clean bootJar

FROM adoptopenjdk/openjdk11
COPY --from=builder build/libs/*.jar app.jar

ENTRYPOINT ["java","-jar", "-Dspring.config.location=${SPRING_CONFIG_LOCATION}", "/app.jar"]
