package com.example.WeBuyBusinesses.Service;
import com.example.WeBuyBusinesses.Model.User;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service

public interface UserService {
    User saveUser(User user);
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    Optional<User> getUserByUsername(String username);
    void deleteUser(Long id);       
}
