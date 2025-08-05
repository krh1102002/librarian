package com.hackathon_ai.LibraryManagementBackend.dtos.responseDtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hackathon_ai.LibraryManagementBackend.entites.Book;
import com.hackathon_ai.LibraryManagementBackend.entites.IssueRecord;
import com.hackathon_ai.LibraryManagementBackend.enums.CopyStatus;
import com.hackathon_ai.LibraryManagementBackend.enums.Racks;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
public class CopyResponseDto {
    private Long id;

    private Racks rack;

    private CopyStatus status;

    private String description;

    private boolean isAvailable;

    private Book book;

    @JsonIgnoreProperties
    private List<IssueRecordResponseDto> issueRecords;
}
