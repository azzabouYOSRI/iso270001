# Use an official OpenJDK runtime as a parent image
FROM openjdk:17

# Set the working directory to /iso270001
WORKDIR /iso270001

# Copy the jar file to the container
COPY build/libs/iso270001-0.0.1-SNAPSHOT.jar app.jar

# Expose the port the application will run on
EXPOSE 8080

# Set a name for the Docker image
LABEL Name=my-application

# Run the jar file
CMD ["java", "-jar", "app.jar"]

