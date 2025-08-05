package com.hackathon_ai.LibraryManagementBackend.Service.Impl;

import com.hackathon_ai.LibraryManagementBackend.Service.LoginService;
import com.hackathon_ai.LibraryManagementBackend.dtos.responseDtos.LibrarianResponseDto;
import com.hackathon_ai.LibraryManagementBackend.entites.Librarian;
import com.hackathon_ai.LibraryManagementBackend.exceptions.ResourceNotFoundException;
import com.hackathon_ai.LibraryManagementBackend.repository.LibrarianRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LoginServiceImpl implements LoginService {
    LibrarianRepository librarianRepository;
    ModelMapper modelMapper;
    @Override
    public LibrarianResponseDto login(String email, String password) {
        Librarian librarian = librarianRepository.findByEmail(email);

        if(librarian == null){
            throw new ResourceNotFoundException("Invalid email");
        }else if(!librarian.getPassword().equals(password)){
            throw new ResourceNotFoundException("Invalid password");
        }else {
            return modelMapper.map(librarian, LibrarianResponseDto.class);
        }

    }
}
