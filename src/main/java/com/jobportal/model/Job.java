package com.jobportal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String company;
    private String location;

    public Job(){}

    public Job(String title,String company,String location){
        this.title=title;
        this.company=company;
        this.location=location;
    }

    public int getId(){
        return id;
    }

    public void setId(int id){
        this.id=id;
    }

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title=title;
    }

    public String getCompany(){
        return company;
    }

    public void setCompany(String company){
        this.company=company;
    }

    public String getLocation(){
        return location;
    }

    public void setLocation(String location){
        this.location=location;
    }
}