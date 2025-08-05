package com.hackathon_ai.LibraryManagementBackend.entites;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity(name = "users")
@Data
public class User extends BaseEntity{

    private String fullName;

    private String email;

    private String phoneNo;

    private boolean passIssued;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<IssueRecord> issueRecords;
}
