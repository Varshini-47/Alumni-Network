package com.example.alumni.service;

import com.example.alumni.model.User;
import com.example.alumni.repository.AchievementRepository;
import com.example.alumni.repository.WorkExperienceRepository;
import com.example.alumni.repository.JobOpportunityRepository;
import com.example.alumni.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AchievementRepository achievementRepository;
    @Autowired
    private JobOpportunityRepository jobOpportunityRepository;
    @Autowired
    private WorkExperienceRepository workExperienceRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already registered!";
        }

        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // If role is "ADMIN", ignore phone, batch, and rollNo
        // if ("ADMIN".equals(user.getRole())) {
        // user.setPhone(null);
        // user.setBatch(null);
        // user.setRollNo(null);
        // }

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

            if (passwordEncoder.matches(password, user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Transactional
    public boolean deleteUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            workExperienceRepository.deleteByUser_Id(id);
            achievementRepository.deleteByUserId(id);
            jobOpportunityRepository.deleteByUserId(id);
            userRepository.delete(user);

            return true;
        }

        return false;
    }
}
