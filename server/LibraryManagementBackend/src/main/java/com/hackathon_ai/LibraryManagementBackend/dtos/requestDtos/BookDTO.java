package com.hackathon_ai.librarymanagementbackend.requestDtos;

import com.hackathon_ai.LibraryManagementBackend.enums.Subjects;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Data
public class BookDTO {
    private String title;
    private String author;
    private Subjects subject;
    private Long isbnNo;
    private Double price;
    private String description;
}