package com.hackathon_ai.LibraryManagementBackend.responseDtos;

import lombok.Data;

@Data
public class OverDueDTO {
    private String bookTitle;
    private String Author;
    private Long memberId;
    private Long copyId;
    private Long daysOverdue;
    private Long fineAmount;
}
