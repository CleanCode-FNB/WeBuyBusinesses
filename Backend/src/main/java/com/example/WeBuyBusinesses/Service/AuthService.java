package com.example.WeBuyBusinesses.Service;

import com.example.WeBuyBusinesses.Dto.AuthRequest;
import com.example.WeBuyBusinesses.Dto.RegisterRequest;
import com.example.WeBuyBusinesses.Model.User;
import com.example.WeBuyBusinesses.Repository.UserRepository;
import com.example.WeBuyBusinesses.Security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service

public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setName(request.getName());
        user.setSurname(request.getSurname());
        user.setRole(request.getRole());
        

        userRepository.save(user);
        return "User registered successfully!";
    }

    public String login(AuthRequest request) {
        Optional<User> user = userRepository.findByUsername(request.getUsername());

        if (user.isPresent() && passwordEncoder.matches(request.getPassword(), user.get().getPassword())) {
            return jwtUtil.generateToken(user.get().getUsername());
        } else {
            throw new RuntimeException("Invalid username or password");
        }
    }    
}
