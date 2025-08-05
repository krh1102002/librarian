package com.hackathon_ai.LibraryManagementBackend.controller;

import com.hackathon_ai.LibraryManagementBackend.Service.IssueRecordService;
import com.hackathon_ai.LibraryManagementBackend.responseDtos.OverDueDTO;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/issue-records")
public class IssueRecordController {

    private IssueRecordService issueRecordService;

    @GetMapping("/overdue")
    public ResponseEntity<List<OverDueDTO>> getOverdueDetails(){
        return ResponseEntity.status(HttpStatus.OK)
                .body(issueRecordService.getOverDueDetails());
    }
}
