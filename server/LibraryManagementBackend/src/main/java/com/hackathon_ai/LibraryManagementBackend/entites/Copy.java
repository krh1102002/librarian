package com.hackathon_ai.LibraryManagementBackend.entites;

import com.hackathon_ai.LibraryManagementBackend.enums.CopyStatus;
import com.hackathon_ai.LibraryManagementBackend.enums.Racks;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity(name = "copies")
public class Copy extends BaseEntity{

    @Enumerated(EnumType.STRING)
    private Racks rack;

    @Enumerated(EnumType.STRING)
    private CopyStatus status;

    private String description;

    private boolean isAvailable;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @OneToMany(mappedBy = "copy", cascade = CascadeType.ALL)
    private List<IssueRecord> issueRecords;
}
