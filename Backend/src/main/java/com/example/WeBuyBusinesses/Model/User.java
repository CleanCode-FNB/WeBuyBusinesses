package com.example.WeBuyBusinesses.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String surname;
    
    @Column(unique = true)
    private String email;
    
    private String password;

    private String role;  // Storing role as a string ("USER" or "ADMIN")
}
