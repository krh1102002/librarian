package com.hackathon_ai.LibraryManagementBackend.repository;

import com.hackathon_ai.LibraryManagementBackend.entites.Copy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CopyRepository extends JpaRepository<Copy,Long> {
    List<Copy> getByBookId(Long bookId);

    List<Copy> findByBook_Id(Long bookId);
}
