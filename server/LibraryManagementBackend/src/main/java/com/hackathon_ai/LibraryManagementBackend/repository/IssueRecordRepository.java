package com.hackathon_ai.LibraryManagementBackend.repository;

import com.hackathon_ai.LibraryManagementBackend.entites.IssueRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRecordRepository extends JpaRepository<IssueRecord,Long> {
    List<IssueRecord> findByUser_IdAndReturnedAtIsNull(Long userId);

}
