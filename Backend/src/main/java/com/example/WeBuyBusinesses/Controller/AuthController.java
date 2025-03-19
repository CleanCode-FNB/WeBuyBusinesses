package com.example.WeBuyBusinesses.Controller;


import com.example.WeBuyBusinesses.Dto.AuthRequest;
import com.example.WeBuyBusinesses.Dto.RegisterRequest;
import com.example.WeBuyBusinesses.Service.AuthService;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
@Tag(name = "Auth Controller", description = "Endpoints for managing users")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        return authService.registerUser(request);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        return authService.loginUser(request);
    }
  
}
