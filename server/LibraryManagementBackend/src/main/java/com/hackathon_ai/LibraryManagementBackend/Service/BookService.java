package com.hackathon_ai.LibraryManagementBackend.Service;

import com.hackathon_ai.LibraryManagementBackend.responseDtos.ApiResponse;
import com.hackathon_ai.LibraryManagementBackend.responseDtos.BookUpdateDTO;
import com.hackathon_ai.librarymanagementbackend.requestDtos.BookDTO;

import java.util.List;


public interface BookService {
    ApiResponse saveBook(com.hackathon_ai.librarymanagementbackend.requestDtos.BookDTO bookDTO);

    BookDTO getBookById(Long id);

    ApiResponse updateBook(BookUpdateDTO bookUpdateDTO);

    ApiResponse deleteBook(Long bookId);

    List<BookDTO> getAllBooks();
}
