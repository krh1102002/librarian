package com.hackathon_ai.LibraryManagementBackend.dtos.responseDtos;

import com.hackathon_ai.LibraryManagementBackend.entites.Copy;
import com.hackathon_ai.LibraryManagementBackend.entites.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.util.Date;

@Data
public class IssueRecordResponseDto {
    private Date expectedDue;

    private Date returnedAt;

    private Long copy_id;

    private Long user_id;
}
