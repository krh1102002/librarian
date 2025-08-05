package com.hackathon_ai.LibraryManagementBackend.responseDtos;

import com.hackathon_ai.LibraryManagementBackend.enums.Subjects;
import lombok.Data;

@Data
public class BookUpdateDTO {
    private Long bookId;
    private String title;
    private String author;
    private Subjects subject;
    private Long isbnNo;
    private Double price;
    private String description;
}
