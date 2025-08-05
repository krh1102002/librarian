package com.hackathon_ai.LibraryManagementBackend.dtos.responseDtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hackathon_ai.LibraryManagementBackend.entites.IssueRecord;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Data
public class UserResponseDto {

    private Long id;

    private String fullName;

    private String email;

    private String phoneNo;

    private boolean passIssued;

    @JsonIgnoreProperties
    private List<IssueRecordResponseDto> issueRecords;
}
