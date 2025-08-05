package com.hackathon_ai.LibraryManagementBackend.entites;

import com.hackathon_ai.LibraryManagementBackend.enums.Subjects;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity(name = "books")
@Data
public class Book extends BaseEntity{
    private String title;

    private String author;

    private Long isbnNo;

    private Subjects sub;

    private double price;

    private String description;

    private int totalQuantity;

    private int availableQuantity;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<Copy> copies;
}
