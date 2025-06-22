package com.ilerna.classroom_booking.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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
    @JsonIgnoreProperties("reservations") // 'reservations' es la lista en User
    private User user;

    @ManyToOne
    @JoinColumn(name = "classroom_id")
    @JsonIgnoreProperties("bookings") // 'bookings' es la lista en Classroom
    private Classroom classroom;
}
