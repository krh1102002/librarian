package com.hackathon_ai.LibraryManagementBackend.requestDtos;

import com.hackathon_ai.LibraryManagementBackend.enums.CopyStatus;
import com.hackathon_ai.LibraryManagementBackend.enums.Racks;

public class CopyDTO {
    private Racks rack;
    private CopyStatus condition;
}
