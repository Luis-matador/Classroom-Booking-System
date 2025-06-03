package com.ilerna.classroom_booking.model.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String state;
    private String reason;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "classroom_id")
    private Classroom classroom;
    @OneToMany(mappedBy = "booking")
    private List<ReservationHistory> reservationHistories;

}
