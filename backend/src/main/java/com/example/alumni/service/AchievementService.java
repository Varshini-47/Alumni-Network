
package com.example.alumni.service;

import com.example.alumni.model.Achievement;
import com.example.alumni.repository.AchievementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AchievementService {

    @Autowired
    private AchievementRepository achAchievementRepository;

    public List<Achievement> getAllAchievements() {
        return achAchievementRepository.findAll();
    }

    public Achievement addAchievement(Achievement achAchievement) {
        return achAchievementRepository.save(achAchievement);
    }

    public List<Achievement> getAchievementsByUserId(Long userId) {

        return achAchievementRepository.findByUserId(userId);
    }

    public Optional<Achievement> getAchievementById(Long id) {
        return achAchievementRepository.findById(id);
    }

    public void deleteAchievement(Long id) {
        achAchievementRepository.deleteById(id);
    }
}