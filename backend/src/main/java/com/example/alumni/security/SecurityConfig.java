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
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(oauth2LoginSuccessHandler))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/register", "/api/login", "/api/google-login", "/api/complete-profile",
                                "/api/logout", "/api/users/{id}", "/api/users/{id}/updateProfile",
                                "/api/work-experience/user/{id}", "/api/work-experience", "/api/work-experience/{id}",
                                "/api/chat", "/api/chat/sendGroupMessage", "/api/chat/groups/{groupId}/messages",
                                "/chat/group/{groupId}/messages","/api/achievements/{id}","/api/work-experience/{id}",
                                "/api/achievements", "/api/searchchat/users", "/api/searchchat/groups",
                                "/api/searchchat/groups/{groupId}/members", "/api/achievements/all",
                                "/api/achievements/user/{id}", "/chat", "/chat/**", "/api/chat/history/{userId}",
                                "/api/jobs", "/api/email", "/api/gallery/folders", "/api/gallery/folder/{folderName}",
                                "/api/gallery/upload", "/api/email/invite", "/api/search", "/api/events",
                                "/api/users/{id}/points", "/api/users/leaderboard", "/api/jobs/{id}",
                                "/api/achievements/{id}", "/api/users", "/api/chat/recent/{userId}",
                                "/api/chat/history/{userId}/{receiverId}", "/api/email/forgot-password",
                                "/api/email/reset-password", "/api/chat/groups", "/api/chat/groups/{groupId}/join")
                        .permitAll() 
                        .anyRequest().authenticated())
                .csrf(csrf -> csrf.disable());

        return http.build();
    }
}
