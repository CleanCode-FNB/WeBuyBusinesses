package com.example.WeBuyBusinesses.Controller;


import com.example.WeBuyBusinesses.Dto.AuthRequest;
import com.example.WeBuyBusinesses.Dto.RegisterRequest;
import com.example.WeBuyBusinesses.Service.AuthService;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Auth Controller", description = "Endpoints for managing users")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }    
}
