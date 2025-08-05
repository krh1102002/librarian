package com.hackathon_ai.LibraryManagementBackend.controller;

import com.hackathon_ai.LibraryManagementBackend.Service.CopyService;
import com.hackathon_ai.LibraryManagementBackend.dtos.requestDtos.CopyRequestDto;
import com.hackathon_ai.LibraryManagementBackend.dtos.responseDtos.CopyResponseDto;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/copy")
public class CopyController {
    private CopyService copyService;

    @PostMapping("/add")
    public CopyResponseDto createCopy(@RequestBody CopyRequestDto copyRequestDto){
        return copyService.createCopy(copyRequestDto);
    }

    @PutMapping("/update")
    public CopyResponseDto updateCopy(@RequestBody CopyResponseDto copyResponseDto){
        return copyService.updateCopy(copyResponseDto);
    }

    @DeleteMapping("/remove/{id}")
    public String removeCopy(@PathVariable Long id){
        return copyService.removeCopy(id);
    }

    @GetMapping("/getByBookId/{bookId}")
    public List<CopyResponseDto> getByBookId(@PathVariable Long bookId){
        return copyService.getByBookId(bookId);
    }

    @GetMapping("/getById/{copyId}")
    public List<CopyResponseDto> getById(@PathVariable Long bookId){
        return copyService.getByBookId(bookId);
    }

    @GetMapping("/getByUserId/{userId}")
    public List<CopyResponseDto> getByUserId(@PathVariable Long userId){
        return copyService.getByUserId(userId);
    }

}
