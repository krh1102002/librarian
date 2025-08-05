package com.hackathon_ai.LibraryManagementBackend.Service.Impl;

import com.hackathon_ai.LibraryManagementBackend.Service.CopyService;
import com.hackathon_ai.LibraryManagementBackend.dtos.requestDtos.CopyRequestDto;
import com.hackathon_ai.LibraryManagementBackend.dtos.responseDtos.CopyResponseDto;
import com.hackathon_ai.LibraryManagementBackend.entites.Copy;
import com.hackathon_ai.LibraryManagementBackend.entites.IssueRecord;
import com.hackathon_ai.LibraryManagementBackend.exceptions.ResourceNotFoundException;
import com.hackathon_ai.LibraryManagementBackend.repository.CopyRepository;
import com.hackathon_ai.LibraryManagementBackend.repository.IssueRecordRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class CopyServiceImpl implements CopyService {

    private final IssueRecordRepository issueRecordRepository;
    private final CopyRepository copyRepository;
    private final ModelMapper modelMapper;

    @Override
    public CopyResponseDto createCopy(CopyRequestDto copyRequestDto) {
        // 1. Map DTO to entity
        Copy copy = modelMapper.map(copyRequestDto, Copy.class);
        copy.setAvailable(true);

        // 2. Save the new entity to the database
        Copy savedCopy = copyRepository.save(copy);

        // 3. Map the saved entity back to a response DTO
        return modelMapper.map(savedCopy, CopyResponseDto.class);
    }

    @Override
    public CopyResponseDto updateCopy(CopyResponseDto copyResponseDto) {
        // 1. Fetch the existing entity from the database
        Copy existingCopy = copyRepository.findById(copyResponseDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Copy not found with id: " + copyResponseDto.getId()));

        // 2. Update the fields of the existing entity from the DTO
        existingCopy.setDescription(copyResponseDto.getDescription());
        existingCopy.setAvailable(copyResponseDto.isAvailable());
        existingCopy.setRack(copyResponseDto.getRack());
        existingCopy.setStatus(copyResponseDto.getStatus());
        // Do not update the book ID directly if it's a foreign key, unless you have a specific method for it.

        // 3. Save the updated entity
        Copy updatedCopy = copyRepository.save(existingCopy);

        // 4. Map the updated entity back to a response DTO
        return modelMapper.map(updatedCopy, CopyResponseDto.class);
    }

    @Override
    public String removeCopy(Long id) {
        // Use a descriptive exception in case the ID is not found
        Copy copy = copyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Copy not found with id: " + id));

        copyRepository.delete(copy);

        return "Removed successfully.";
    }

    @Override
    public List<CopyResponseDto> getByBookId(Long bookId) {
        // Correct method name to find by the book's ID
        List<Copy> copies = copyRepository.findByBook_Id(bookId);

        return copies.stream()
                .map(copy -> modelMapper.map(copy, CopyResponseDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<CopyResponseDto> getByUserId(Long userId) {
        List<IssueRecord> issueRecords = issueRecordRepository.findByUser_IdAndReturnedAtIsNull(userId);

        // Use a stream for more concise and efficient mapping
        return issueRecords.stream()
                .map(IssueRecord::getCopy)
                .map(copy -> modelMapper.map(copy, CopyResponseDto.class))
                .collect(Collectors.toList());
    }
}