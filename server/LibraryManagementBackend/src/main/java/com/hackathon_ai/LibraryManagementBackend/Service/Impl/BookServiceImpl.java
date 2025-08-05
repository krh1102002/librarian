package com.hackathon_ai.LibraryManagementBackend.Service.Impl;

import com.hackathon_ai.LibraryManagementBackend.Service.BookService;
import com.hackathon_ai.LibraryManagementBackend.entites.Book;
import com.hackathon_ai.LibraryManagementBackend.enums.Subjects;
import com.hackathon_ai.LibraryManagementBackend.repository.BookRepository;
import com.hackathon_ai.LibraryManagementBackend.responseDtos.ApiResponse;
import com.hackathon_ai.LibraryManagementBackend.responseDtos.BookUpdateDTO;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hackathon_ai.librarymanagementbackend.requestDtos.BookDTO;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor

public class BookServiceImpl implements BookService {
    private ModelMapper modelMapper;

    private BookRepository bookRepository;

    @Override
    public ApiResponse saveBook(BookDTO bookDTO) {
        Book book = modelMapper.map(bookDTO, Book.class);

        bookRepository.save(book);

        return new ApiResponse("Book Saved Successfully");
    }

    @Override
    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        return modelMapper.map(book, BookDTO.class);
    }

    @Override
    public ApiResponse updateBook(BookUpdateDTO bookUpdateDTO) {
        Long bookId = bookUpdateDTO.getBookId();

        if(bookRepository.existsById(bookId)){
            Book book = bookRepository.findById(bookId).orElseThrow();
            book.setAuthor(bookUpdateDTO.getAuthor());
            book.setTitle(bookUpdateDTO.getTitle());
            book.setSub(bookUpdateDTO.getSubject());
            book.setIsbnNo(bookUpdateDTO.getIsbnNo());
            book.setPrice(bookUpdateDTO.getPrice());
            book.setDescription(bookUpdateDTO.getDescription());
            bookRepository.save(book);
        }

        return new ApiResponse("Book Updated Successfully");

    }

    @Override
    public ApiResponse deleteBook(Long bookId) {

        if(bookRepository.existsById(bookId)){
            bookRepository.deleteById(bookId);
        }
        else{
            return new ApiResponse("Book Not Available");

        }
        return new ApiResponse("Book Deleted Successfully");

    }

    @Override
    public List<BookDTO> getAllBooks() {
        List<Book> bookList = bookRepository.findAll();
        List<BookDTO> bookDTOList = new ArrayList<>();

        for(Book book: bookList){
            BookDTO bookDTO = new BookDTO();
            bookDTO = modelMapper.map(book, BookDTO.class);

            bookDTOList.add(bookDTO);
        }

        return bookDTOList;
    }
}