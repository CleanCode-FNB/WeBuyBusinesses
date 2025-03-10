package com.example.WeBuyBusinesses.Dto;
import com.example.WeBuyBusinesses.Model.Roles;

import lombok.Data;

@Data

public class RegisterRequest {
    private String name;
    private String surname;

    private String username;
    private String password;
    private String email;
    private Roles role;    
}
