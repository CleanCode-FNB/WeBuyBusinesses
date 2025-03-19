package com.example.WeBuyBusinesses.Service;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.WeBuyBusinesses.Model.User;

@Service

public interface UserService {
    User saveUser(User user);
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    Optional<User> getUserByEmail(String email);
    Optional<User> getUserByUsername(String username);
    void deleteUser(Long id);       
}
