package com.hackathon_ai.LibraryManagementBackend.Service;

import com.hackathon_ai.LibraryManagementBackend.responseDtos.OverDueDTO;

import java.util.List;

public interface IssueRecordService {
    List<OverDueDTO> getOverDueDetails();
}
