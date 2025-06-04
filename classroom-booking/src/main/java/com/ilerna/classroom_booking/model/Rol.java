package com.ilerna.classroom_booking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Table(name= "roles")
@NoArgsConstructor
@AllArgsConstructor

public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String rolName;
    @Column(nullable = false, length = 255)
    private String description;
    @OneToMany(mappedBy = "rol")
    private List<User> users;
    @OneToMany(mappedBy = "rol")
    private List<ReservationHistory> reservationHistories;


}
