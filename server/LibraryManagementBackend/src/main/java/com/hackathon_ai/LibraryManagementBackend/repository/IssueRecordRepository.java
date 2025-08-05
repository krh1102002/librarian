package com.hackathon_ai.LibraryManagementBackend.repository;

import com.hackathon_ai.LibraryManagementBackend.entites.IssueRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IssueRecordRepository extends JpaRepository<IssueRecord,Long> {
    List<IssueRecord> findByUser_IdAndReturnedAtIsNull(Long userId);

    @Query("SELECT ir FROM issue_records ir WHERE ir.expectedDue < :currentDate AND ir.returnedAt IS NULL")
    List<IssueRecord> findOverdueRecords(LocalDate currentDate);

}
