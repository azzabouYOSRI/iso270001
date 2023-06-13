plugins {
    java
    id("org.springframework.boot") version "3.0.2"
    id("io.spring.dependency-management") version "1.1.0"
    id("org.graalvm.buildtools.native") version "0.9.18"

}

group = "com.ysoriazabou"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

extra["springBootAdminVersion"] = "3.0.0-M4"

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("de.codecentric:spring-boot-admin-starter-server")
    implementation("jakarta.servlet:jakarta.servlet-api:5.0.0")
    implementation("org.springframework:spring-web:6.0.3")
    implementation("org.springframework:spring-webmvc:6.0.3")
    implementation("org.joinfaces:tomcat-spring-boot-starter:4.7.8")
    implementation("org.springframework.boot:spring-boot-tools:2.2.13.RELEASE")
//    implementation("mysql:mysql-connector-java:8.0.33")
    compileOnly("org.projectlombok:lombok")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    implementation("com.mysql:mysql-connector-j:8.0.32")
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
    annotationProcessor("org.projectlombok:lombok")
    testImplementation("org.springframework.boot:spring-boot-starter-test")




}

dependencyManagement {
    imports {
        mavenBom("de.codecentric:spring-boot-admin-dependencies:${property("springBootAdminVersion")}")
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}
