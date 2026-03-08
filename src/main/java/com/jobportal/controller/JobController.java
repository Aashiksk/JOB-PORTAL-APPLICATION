package com.jobportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.model.Job;
import com.jobportal.repository.JobRepository;

@RestController
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    // GET all jobs
    @GetMapping("/jobs")
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // POST add job
    @PostMapping("/jobs")
    public Job addJob(@RequestBody Job job) {
        return jobRepository.save(job);
    }

    // DELETE job
    @DeleteMapping("/jobs/{id}")
    public void deleteJob(@PathVariable int id) {
        jobRepository.deleteById(id);
    }

    // GET job by id
    @GetMapping("/jobs/{id}")
    public Job getJobById(@PathVariable int id) {
        return jobRepository.findById(id).orElse(null);
}

    // UPDATE job
    @PutMapping("/jobs/{id}")
    public Job updateJob(@PathVariable int id, @RequestBody Job updatedJob) {

        Job job = jobRepository.findById(id).orElse(null);

        if (job != null) {
            job.setTitle(updatedJob.getTitle());
            job.setCompany(updatedJob.getCompany());
            job.setLocation(updatedJob.getLocation());

            return jobRepository.save(job);
        }

        return null;
    }
}