package com.hackathon_ai.LibraryManagementBackend.entites;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.time.LocalDateTime; // Updated import

@EqualsAndHashCode(callSuper = true)
@Data
@Entity(name = "issue_records")
public class IssueRecord extends BaseEntity {

    private LocalDate expectedDue; // Changed from Date to LocalDateTime

    private LocalDate returnedAt; // Changed from Date to LocalDateTime

    @ManyToOne
    @JoinColumn(name = "copy_id")
    private Copy copy;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}