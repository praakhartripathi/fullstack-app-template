package com.template.app.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * OpenAPI / Swagger configuration.
 * Access the Swagger UI at: /swagger-ui.html
 * Access the API docs at:   /api-docs
 */
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Full-Stack App Template API")
                        .version("1.0.0")
                        .description("Production-ready REST API template with Spring Boot, PostgreSQL, and multi-schema support.")
                        .contact(new Contact()
                                .name("Template Team")
                                .email("team@example.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local Development"),
                        new Server().url("http://backend:8080").description("Docker Environment")
                ));
    }
}
