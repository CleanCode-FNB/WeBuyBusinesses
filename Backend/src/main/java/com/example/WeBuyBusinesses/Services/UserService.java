package com.example.webuybusinesses.Services;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.webuybusinesses.Dto.LoginDto;
import com.example.webuybusinesses.Dto.RegisterDto;
import com.example.webuybusinesses.Model.Role;
import com.example.webuybusinesses.Model.User;
import com.example.webuybusinesses.Repository.UserRepository;

import java.util.Collections;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User loginUser(LoginDto loginDto) {
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Authenticate the user with Spring Security
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
            user.getEmail(),
            null, // Credentials are already verified, so null is fine here
            Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().toUpperCase()))
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return user;
    }

    public User registerUser(RegisterDto registerDto) {
        Optional<User> existingUser = userRepository.findByEmail(registerDto.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        if (!registerDto.getRole().equalsIgnoreCase(Role.ADMIN) &&
            !registerDto.getRole().equalsIgnoreCase(Role.BUSINESSBUYER) &&
            !registerDto.getRole().equalsIgnoreCase(Role.BUSINESSSELLER)) {
            throw new RuntimeException("Invalid role provided");
        }

        User user = new User();
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setName(registerDto.getName());
        user.setSurname(registerDto.getSurname());
        user.setRole(registerDto.getRole().toUpperCase()); // Store as uppercase for consistency

        User savedUser = userRepository.save(user);

        // Optional: Auto-login after registration
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
            savedUser.getEmail(),
            null,
            Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + savedUser.getRole()))
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return savedUser;
    }
}