package com.example.alumni.service;

import com.example.alumni.model.JobOpportunity;
import com.example.alumni.repository.JobOpportunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobOpportunityService {

    @Autowired
    private JobOpportunityRepository achJobOpportunityRepository;

    public List<JobOpportunity> getAllJobOpportunitys() {
        return achJobOpportunityRepository.findAll();
    }

    public JobOpportunity addJobOpportunity(JobOpportunity achJobOpportunity) {

        return achJobOpportunityRepository.save(achJobOpportunity);
    }

    public List<JobOpportunity> getJobOpportunitysByUserId(Long userId) {
        return achJobOpportunityRepository.findByUserId(userId);
    }

    public Optional<JobOpportunity> getJobById(Long id) {
        return achJobOpportunityRepository.findById(id);
    }

    public void deleteJobOpportunity(Long id) {
        achJobOpportunityRepository.deleteById(id);
    }
}
