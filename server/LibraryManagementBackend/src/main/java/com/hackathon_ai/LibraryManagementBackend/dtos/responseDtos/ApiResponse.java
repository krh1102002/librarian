package com.hackathon_ai.LibraryManagementBackend.responseDtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApiResponse {
    private String msg;
    private LocalDateTime curTime;

    public ApiResponse(String message) {
        this.msg = message;
        this.curTime = LocalDateTime.now();
    }

    public ApiResponse() {
        this.curTime = LocalDateTime.now();
    }
}
