package com.example.alumni.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "contact_messages")
public class ContactMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private boolean resolved = false; // ✅ Added field for tracking resolution status

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
