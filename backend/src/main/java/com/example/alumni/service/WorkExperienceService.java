package com.example.alumni.service;

import com.example.alumni.model.WorkExperience;
import com.example.alumni.model.User;
import com.example.alumni.repository.WorkExperienceRepository;
import com.example.alumni.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkExperienceService {

    @Autowired
    private WorkExperienceRepository workExperienceRepository;

    @Autowired
    private UserRepository userRepository;

    public WorkExperience addWorkExperience(WorkExperience workExperience) {
        return workExperienceRepository.save(workExperience);
    }

    public List<WorkExperience> getWorkExperiencesByUserId(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new RuntimeException("User not found with ID: " + userId);
        }
        return workExperienceRepository.findByUser(user);
    }

    public List<WorkExperience> getAllWorkExperiences() {
        return workExperienceRepository.findAllWithUser();
    }

    public void deleteWorkExperience(Long id) {
        workExperienceRepository.deleteById(id);
    }
}
