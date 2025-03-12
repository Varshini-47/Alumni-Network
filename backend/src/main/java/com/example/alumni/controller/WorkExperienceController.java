package com.example.alumni.controller;

import com.example.alumni.model.WorkExperience;
import com.example.alumni.service.WorkExperienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/work-experience")
public class WorkExperienceController {

    @Autowired
    private WorkExperienceService workExperienceService;
    @PostMapping
    public WorkExperience addWorkExperience(@RequestBody WorkExperience workExperience) {
        return workExperienceService.addWorkExperience(workExperience);
    }

    @GetMapping("/user/{userId}")
    public List<WorkExperience> getWorkExperiencesByUserId(@PathVariable Long userId) {
        return workExperienceService.getWorkExperiencesByUserId(userId);
    }

    @GetMapping
    public List<WorkExperience> getAllWorkExperiences() {
        return workExperienceService.getAllWorkExperiences();
    }
    @DeleteMapping("/{id}")
public ResponseEntity<Void> deleteWorkExperience(@PathVariable Long id) {
    workExperienceService.deleteWorkExperience(id);
    return ResponseEntity.noContent().build();
}

}
