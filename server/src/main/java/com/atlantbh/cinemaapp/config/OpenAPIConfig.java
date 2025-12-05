package com.atlantbh.cinemaapp.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {
    @Bean
    public OpenAPI configureCinemaAppSwaggerDocumentation() {
        final Server devServer = new Server();
        devServer.setUrl("http://localhost:8080");
        devServer.setDescription("Development server");

        final Contact contact = new Contact();
        contact.setName("Ilhan Hasicic");
        contact.setEmail("ilhanhasicic@gmail.com");

        final Info info = new Info()
                .title("Cinema App API")
                .version("1.0")
                .description("API documentation for CinemaApp Spring Boot project")
                .contact(contact);

        return new OpenAPI()
                .info(info)
                .servers(List.of(devServer));
    }
}
