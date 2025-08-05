package com.hackathon_ai.LibraryManagementBackend.controller;

import com.hackathon_ai.LibraryManagementBackend.Service.UserService;
import com.hackathon_ai.LibraryManagementBackend.dtos.requestDtos.UserRequestDto;
import com.hackathon_ai.LibraryManagementBackend.dtos.responseDtos.UserResponseDto;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    UserService userService;

    @PostMapping("/add")
    public UserResponseDto addUser(@RequestBody UserRequestDto userRequestDto){
        return userService.addUser(userRequestDto);
    }

    @PutMapping("/update")
    public UserResponseDto updateUser(@RequestBody UserResponseDto userResponseDto){
        return userService.updateUser(userResponseDto);
    }

    @GetMapping("/getAll")
    public List<UserResponseDto> getALl(){
        return userService.getALl();
    }

    @GetMapping("/getById/{id}")
    public UserResponseDto getById(@PathVariable Long id){
        return userService.getById(id);
    }

    @GetMapping("/usersJoinedInLastMonth")
    public List<UserResponseDto> getUsersJoinedInLastMonth(){
        return userService.getUsersJoinedInLastMonth();
    }


}
