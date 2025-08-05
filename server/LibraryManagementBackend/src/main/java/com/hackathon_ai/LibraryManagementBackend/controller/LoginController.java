package com.hackathon_ai.LibraryManagementBackend.controller;

import com.hackathon_ai.LibraryManagementBackend.Service.LoginService;
import com.hackathon_ai.LibraryManagementBackend.dtos.responseDtos.LibrarianResponseDto;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/login")
public class LoginController {
    LoginService loginService;
    @PostMapping()
    public LibrarianResponseDto login(@RequestParam String email,@RequestParam String password){
        return loginService.login(email,password);
    }

}
