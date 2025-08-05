package com.hackathon_ai.LibraryManagementBackend.dtos.requestDtos;

import lombok.Data;

@Data
public class UserRequestDto {

    private String fullName;

    private String email;

    private String phoneNo;

    private boolean passIssued;
}
