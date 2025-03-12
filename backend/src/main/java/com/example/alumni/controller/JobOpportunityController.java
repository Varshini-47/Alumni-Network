package com.example.alumni.controller;

import com.example.alumni.model.JobOpportunity;
import com.example.alumni.service.JobOpportunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class JobOpportunityController {

    @Autowired
    private JobOpportunityService jobJobOpportunityService;

    @GetMapping
    public List<JobOpportunity> getAllJobOpportunitys() {
        return jobJobOpportunityService.getAllJobOpportunitys();
    }

    @PostMapping
    public JobOpportunity addJobOpportunity(@RequestBody JobOpportunity jobJobOpportunity) {
        return jobJobOpportunityService.addJobOpportunity(jobJobOpportunity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Long id) {
        Optional<JobOpportunity> job = jobJobOpportunityService.getJobById(id);
        if (job.isPresent()) {
            jobJobOpportunityService.deleteJobOpportunity(id);
            return ResponseEntity.ok().body("Job deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
