package com.example.WeBuyBusinesses.Dto;


import lombok.Data;

@Data

public class RegisterRequest {
    private String name;
    private String surname;

    private String username;
    private String password;
    private String email;
    private String role;    
}
