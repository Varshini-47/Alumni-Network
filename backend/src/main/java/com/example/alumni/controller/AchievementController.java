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

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Long id) {
        Optional<Achievement> achievement = achieAchievementService.getAchievementById(id);
        if (achievement.isPresent()) {
            achieAchievementService.deleteAchievement(id);
            return ResponseEntity.ok().body("Job deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
