package com.hackathon_ai.LibraryManagementBackend.dtos.requestDtos;

import com.hackathon_ai.LibraryManagementBackend.entites.Book;
import com.hackathon_ai.LibraryManagementBackend.entites.IssueRecord;
import com.hackathon_ai.LibraryManagementBackend.enums.CopyStatus;
import com.hackathon_ai.LibraryManagementBackend.enums.Racks;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
public class CopyRequestDto {

    private Racks rack;

    private CopyStatus status;

    private String description;

    private boolean isAvailable;

    private Long book_id;
}
