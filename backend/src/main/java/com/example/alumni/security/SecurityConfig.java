package com.example.alumni.security;

import com.example.alumni.security.OAuth2LoginSuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final OAuth2LoginSuccessHandler oauth2LoginSuccessHandler;

    // Constructor to inject OAuth2LoginSuccessHandler
    public SecurityConfig(OAuth2LoginSuccessHandler oauth2LoginSuccessHandler) {
        this.oauth2LoginSuccessHandler = oauth2LoginSuccessHandler;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()  // Disabling CSRF (only recommended for development)
            .oauth2Login(oauth2 -> oauth2
                .successHandler(oauth2LoginSuccessHandler)  // Set the success handler
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/register", "/api/login", "/api/google-login", "/api/complete-profile", "/api/logout","/api/email/reset-password","/api/email/forgot-password").permitAll()  // Public access to specific endpoints
                .anyRequest().authenticated()  // Secure all other requests
            );

        return http.build();
    }
}