package com.example.alumni.controller;

import com.example.alumni.dto.AchievementDTO;
import com.example.alumni.model.Achievement;
import com.example.alumni.repository.AchievementRepository;
import com.example.alumni.service.AchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/achievements")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AchievementController {

    @Autowired
    private AchievementService achieAchievementService;
    @Autowired
    private AchievementRepository achieAchievementRepository;

    @GetMapping("/all")
    public List<AchievementDTO> getAllAchievements() {
        return achieAchievementRepository.getAllAchievementsWithUser();
    }

    @PostMapping
    public Achievement addAchievement(@RequestBody Achievement achieAchievement) {
        return achieAchievementService.addAchievement(achieAchievement);
    }

    @GetMapping("/user/{id}")
    public List<Achievement> getAchievementsByUserId(@PathVariable Long id) {
        return achieAchievementService.getAchievementsByUserId(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Achievement> getWorkExperienceById(@PathVariable Long id) {
        Achievement achievementExperience = achieAchievementService.getAchievementById(id);
        return ResponseEntity.ok(achievementExperience);
    }
    
    
    @PutMapping("/{id}")
    public ResponseEntity<Achievement> updateAchievement(
            @PathVariable Long id,
            @RequestBody Achievement updatedAchievement) {
        Achievement achievement = achieAchievementService.updateAchievement(id, updatedAchievement);
        return ResponseEntity.ok(achievement);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Long id) {
        Achievement achievement = achieAchievementService.getAchievementById(id);
            achieAchievementService.deleteAchievement(id);
            return ResponseEntity.ok().body("Job deleted successfully");
    }
}
