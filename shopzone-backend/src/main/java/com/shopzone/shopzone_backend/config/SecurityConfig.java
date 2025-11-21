package com.shopzone.shopzone_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Desactiva protección CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**").permitAll() // Permite acceso a tus endpoints
                        .anyRequest().authenticated() // El resto requiere autenticación
                )
                .formLogin(login -> login.disable()) // Desactiva el formulario de login de Spring
                .httpBasic(httpBasic -> httpBasic.disable()); // Desactiva autenticación básica

        return http.build();
    }
}
