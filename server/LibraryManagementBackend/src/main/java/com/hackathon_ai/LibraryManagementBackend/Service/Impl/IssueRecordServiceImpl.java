package com.hackathon_ai.LibraryManagementBackend.Service.Impl;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;

import com.hackathon_ai.LibraryManagementBackend.Service.IssueRecordService;
import com.hackathon_ai.LibraryManagementBackend.entites.Book;
import com.hackathon_ai.LibraryManagementBackend.entites.Copy;
import com.hackathon_ai.LibraryManagementBackend.entites.IssueRecord;
import com.hackathon_ai.LibraryManagementBackend.repository.BookRepository;
import com.hackathon_ai.LibraryManagementBackend.repository.CopyRepository;
import com.hackathon_ai.LibraryManagementBackend.repository.IssueRecordRepository;
import com.hackathon_ai.LibraryManagementBackend.responseDtos.OverDueDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.Temporal;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class IssueRecordServiceImpl implements IssueRecordService {

    private final IssueRecordRepository issueRecordRepository;
    private final CopyRepository copyRepository;
    private final BookRepository bookRepository;

    @Autowired
    public IssueRecordServiceImpl(IssueRecordRepository issueRecordRepository,
                                  CopyRepository copyRepository,
                                  BookRepository bookRepository) {
        this.issueRecordRepository = issueRecordRepository;
        this.copyRepository = copyRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public List<OverDueDTO> getOverDueDetails() {
        List<OverDueDTO> overDueDTOList = new ArrayList<>();

        LocalDate currentDate = LocalDate.now();
        List<IssueRecord> issueRecordList = issueRecordRepository.findOverdueRecords(currentDate);

        for(IssueRecord issueRecord: issueRecordList){
            OverDueDTO overDueDTO = new OverDueDTO();
            overDueDTO.setCopyId(issueRecord.getCopy().getId());
            overDueDTO.setMemberId(issueRecord.getUser().getId());

            LocalDate expectedDate = issueRecord.getExpectedDue();
            long daysBetween = ChronoUnit.DAYS.between(currentDate, expectedDate);

            overDueDTO.setDaysOverdue(daysBetween);
            overDueDTO.setFineAmount(5 * daysBetween);

            Long copyId = issueRecord.getCopy().getId();
            Copy copy = copyRepository.findById(copyId).orElseThrow();

            Book book = bookRepository.findById(copy.getBook().getId()).orElseThrow();
            overDueDTO.setBookTitle(book.getTitle());
            overDueDTO.setAuthor(book.getAuthor());

            overDueDTOList.add(overDueDTO);
        }

        return overDueDTOList;
    }
}
