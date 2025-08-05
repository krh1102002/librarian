package com.hackathon_ai.LibraryManagementBackend.Service;

import com.hackathon_ai.LibraryManagementBackend.dtos.requestDtos.UserRequestDto;
import com.hackathon_ai.LibraryManagementBackend.dtos.responseDtos.UserResponseDto;

import java.util.List;

public interface UserService {
    UserResponseDto addUser(UserRequestDto userRequestDto);
    UserResponseDto updateUser(UserResponseDto userResponseDto);

    List<UserResponseDto> getALl();

    UserResponseDto getById(Long id);

    List<UserResponseDto> getUsersJoinedInLastMonth();
}
