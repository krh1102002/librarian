package com.hackathon_ai.LibraryManagementBackend.repository;

import com.hackathon_ai.LibraryManagementBackend.entites.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book,Long> {
}
