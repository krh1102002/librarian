package com.hackathon_ai.LibraryManagementBackend.exceptions;

public class DuplicateResourceException extends RuntimeException{
    public DuplicateResourceException(String msg){
        super(msg);
    }
}
