package com.hackathon_ai.LibraryManagementBackend.entites;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Librarian extends BaseEntity{
    private String fullName;

    private String email;

    private String password;

}
