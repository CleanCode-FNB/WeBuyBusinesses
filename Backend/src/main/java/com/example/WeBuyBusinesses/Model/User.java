package com.example.WeBuyBusinesses.Model;
import javax.management.relation.Role;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false, unique = true)
    String username;

    @Column(nullable = false)
    String password;

    @Column(nullable = false)
    String email;
    
    @Column(nullable = false)
    String name;

    @Column(nullable = false)
    String surname;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    Roles role;
}
