package com.hackathon_ai.LibraryManagementBackend.Service;

import com.hackathon_ai.LibraryManagementBackend.dtos.responseDtos.LibrarianResponseDto;

public interface LoginService {

    LibrarianResponseDto login(String email, String password);
}
