package com.hackathon_ai.LibraryManagementBackend.repository;

import com.hackathon_ai.LibraryManagementBackend.entites.Librarian;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LibrarianRepository extends JpaRepository<Librarian,Long> {
    Librarian findByEmail(String email);
}
