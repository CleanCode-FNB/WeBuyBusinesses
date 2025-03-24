package com.example.webuybusinesses.Controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.webuybusinesses.Dto.LoginDto;
import com.example.webuybusinesses.Dto.RegisterDto;
import com.example.webuybusinesses.Model.User;
import com.example.webuybusinesses.Services.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegisterDto registerDto) {
        User registeredUser = userService.registerUser(registerDto);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody LoginDto loginDto) {
        User loggedInUser = userService.loginUser(loginDto);
        return ResponseEntity.ok(loggedInUser);
    }
}