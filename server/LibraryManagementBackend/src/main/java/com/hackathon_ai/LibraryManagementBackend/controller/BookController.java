package com.hackathon_ai.LibraryManagementBackend.controller;

import com.hackathon_ai.LibraryManagementBackend.Service.BookService;
import com.hackathon_ai.LibraryManagementBackend.repository.BookRepository;
import com.hackathon_ai.LibraryManagementBackend.responseDtos.ApiResponse;
import com.hackathon_ai.LibraryManagementBackend.responseDtos.BookUpdateDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hackathon_ai.librarymanagementbackend.requestDtos.BookDTO;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    private BookRepository bookRepository;

    private ModelMapper modelMap;

    @PostMapping
    public ResponseEntity<ApiResponse> createBook(@RequestBody BookDTO bookDTO) {
        ApiResponse resp = bookService.saveBook(bookDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(resp);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDTO> getBookById(@PathVariable Long id) {
        BookDTO bookDTO = bookService.getBookById(id);
        return new ResponseEntity<>(bookDTO, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<ApiResponse> updateBook(@RequestBody BookUpdateDTO bookUpdateDTO){
        ApiResponse resp = bookService.updateBook(bookUpdateDTO);
        return ResponseEntity.status(HttpStatus.OK)
            .body(resp);
    }

    @DeleteMapping("/delete/{bookId}")
    public ResponseEntity<ApiResponse> deleteBook(@PathVariable Long bookId){
        ApiResponse resp = bookService.deleteBook(bookId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(resp);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<BookDTO>> getAllBooks() {
        List<BookDTO> bookDTOList = bookService.getAllBooks();
        return new ResponseEntity<>(bookDTOList, HttpStatus.OK);
    }

}
