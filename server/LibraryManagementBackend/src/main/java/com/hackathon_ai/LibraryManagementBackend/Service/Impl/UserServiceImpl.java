package com.hackathon_ai.LibraryManagementBackend.Service.Impl;

import com.hackathon_ai.LibraryManagementBackend.Service.UserService;
import com.hackathon_ai.LibraryManagementBackend.dtos.requestDtos.UserRequestDto;
import com.hackathon_ai.LibraryManagementBackend.dtos.responseDtos.UserResponseDto;
import com.hackathon_ai.LibraryManagementBackend.entites.User;
import com.hackathon_ai.LibraryManagementBackend.exceptions.DuplicateResourceException;
import com.hackathon_ai.LibraryManagementBackend.exceptions.ResourceNotFoundException;
import com.hackathon_ai.LibraryManagementBackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public UserResponseDto addUser(UserRequestDto userRequestDto) {
        if (userRepository.existsByEmail(userRequestDto.getEmail())) {
            throw new DuplicateResourceException("EmailId already exists.");
        }

        User user = modelMapper.map(userRequestDto, User.class);
        User saved = userRepository.save(user);

        return modelMapper.map(saved, UserResponseDto.class);
    }

    @Override
    public UserResponseDto updateUser(UserResponseDto userResponseDto) {
        // 1. Fetch the existing user from the database.
        // Use orElseThrow for a descriptive exception if the user is not found.
        User existingUser = userRepository.findById(userResponseDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userResponseDto.getId()));

        // 2. Update the existing user's fields with data from the DTO.
        // This is the correct way to update an entity.
        existingUser.setEmail(userResponseDto.getEmail());
        existingUser.setFullName(userResponseDto.getFullName());
        existingUser.setPassIssued(userResponseDto.isPassIssued());
        // Do not set ID or created_at, as they should not change.

        // 3. Save the updated entity.
        User updatedUser = userRepository.save(existingUser);

        // 4. Map the updated entity back to a response DTO.
        return modelMapper.map(updatedUser, UserResponseDto.class);
    }

    @Override
    public List<UserResponseDto> getALl() {
        List<User> users = userRepository.findAll();

        // Use a stream for a more functional and concise approach.
        return users.stream()
                .map(user -> modelMapper.map(user, UserResponseDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDto getById(Long id) {
        // 1. Find the user by ID, returning a descriptive exception if not found.
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        // 2. Map the found entity to a response DTO.
        return modelMapper.map(user, UserResponseDto.class);
    }

    @Override
    public List<UserResponseDto> getUsersJoinedInLastMonth() {
        LocalDateTime oneMonthAgo = LocalDateTime.now().minus(1, ChronoUnit.MONTHS);
        List<User> users = userRepository.findByCreatedAtGreaterThanEqual(oneMonthAgo);

        return users.stream()
                .map(user -> modelMapper.map(user, UserResponseDto.class))
                .collect(Collectors.toList());
    }
}