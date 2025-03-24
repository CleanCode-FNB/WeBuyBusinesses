package com.example.webuybusinesses.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    public static final String ADMIN = "Admin";
    public static final String BUSINESSBUYER = "BUSINESSBUYER";
    public static final String BUSINESSSELLER = "BUSINESSSELLER";
}