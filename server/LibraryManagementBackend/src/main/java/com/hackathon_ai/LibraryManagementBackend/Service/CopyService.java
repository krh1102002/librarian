package com.hackathon_ai.LibraryManagementBackend.Service;

import com.hackathon_ai.LibraryManagementBackend.dtos.requestDtos.CopyRequestDto;
import com.hackathon_ai.LibraryManagementBackend.dtos.responseDtos.CopyResponseDto;

import java.util.List;

public interface CopyService {
    CopyResponseDto createCopy(CopyRequestDto copyRequestDto);

    CopyResponseDto updateCopy(CopyResponseDto copyResponseDto);

    String removeCopy(Long id);

    List<CopyResponseDto> getByBookId(Long bookId);

    List<CopyResponseDto> getByUserId(Long userId);
}
