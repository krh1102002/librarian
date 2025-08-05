package com.hackathon_ai.LibraryManagementBackend.entites;

import com.hackathon_ai.LibraryManagementBackend.enums.PaymentMethod;
import com.hackathon_ai.LibraryManagementBackend.enums.PaymentType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity(name = "payments")
public class Payment extends BaseEntity{
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private double amount;

    @Enumerated(EnumType.STRING)
    private PaymentType type;

    @Enumerated(EnumType.STRING)
    private PaymentMethod method;
}
