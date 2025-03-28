package com.example.WeBuyBusinesses.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.WeBuyBusinesses.Model.User;
import com.example.WeBuyBusinesses.Repository.UserRepository;

@Service
public class UserServiceImpl implements UserService 
{
    
    private final UserRepository userRepository;
    
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByEmail(username);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

   
}
