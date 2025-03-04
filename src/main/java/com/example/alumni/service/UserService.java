package com.example.alumni.service;

import com.example.alumni.model.User;
import com.example.alumni.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already registered!";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);
        return "User registered successfully!";
    }

    public User updateUserProfile(Long id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            if (updatedUser.getName() != null)
                user.setName(updatedUser.getName());
            if (updatedUser.getLastName() != null)
                user.setLastName(updatedUser.getLastName());
            if (updatedUser.getPhone() != null)
                user.setPhone(updatedUser.getPhone());
            if (updatedUser.getBatch() != null)
                user.setBatch(updatedUser.getBatch());
            if (updatedUser.getRollNo() != null)
                user.setRollNo(updatedUser.getRollNo());
            if (updatedUser.getDepartment() != null)
                user.setDepartment(updatedUser.getDepartment());
            if (updatedUser.getImageUrl() != null)
                user.setImageUrl(updatedUser.getImageUrl());
            if (updatedUser.getProfileType() != null)
                user.setProfileType(updatedUser.getProfileType());

            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Optional<User> loginUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // 🔥 Secure password validation
            if (passwordEncoder.matches(password, user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty(); // Return empty if credentials are wrong
    }

}
