package com.hackathon_ai.LibraryManagementBackend.dtos.responseDtos;

import lombok.Data;

@Data
public class LibrarianResponseDto {
    private String fullName;

    private String email;

    private String password;
}
