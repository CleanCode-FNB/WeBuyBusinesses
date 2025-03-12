package com.example.WeBuyBusinesses.Service;import com.example.WeBuyBusinesses.Dto.AuthRequest;
import com.example.WeBuyBusinesses.Dto.AuthResponse;
import com.example.WeBuyBusinesses.Dto.RegisterRequest;
import com.example.WeBuyBusinesses.Model.User;
import com.example.WeBuyBusinesses.Repository.UserRepository;
import com.example.WeBuyBusinesses.Security.JwtUtil;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;import java.util.Optional;

@Service
public class AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserService userService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public ResponseEntity<?> registerUser(RegisterRequest request) {
        if (userService.getUserByUsername(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already in use");
        }

        User user = new User();
        user.setName(request.getName());
        user.setSurname(request.getSurname());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Ensure role is either "USER" or "ADMIN"
        String role = request.getRole().toUpperCase();
        if (!role.equals("USER") && !role.equals("ADMIN")) {
            return ResponseEntity.badRequest().body("Invalid role. Use 'USER' or 'ADMIN'.");
        }

        user.setRole(role);
        userService.saveUser(user);

        return ResponseEntity.ok("User registered successfully");
    }

    public ResponseEntity<?> loginUser(AuthRequest request) {
        Optional<User> userOptional = userService.getUserByUsername(request.getEmail());

        if (userOptional.isEmpty() || !passwordEncoder.matches(request.getPassword(), userOptional.get().getPassword())) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        User user = userOptional.get();
        String token = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(new AuthResponse(token, user.getRole(), user.getEmail(), user.getName()));
    }
}

