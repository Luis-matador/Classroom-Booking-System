package com.ilerna.classroom_booking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "classrooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Classroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    private String location;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private ClassroomType type;
    @OneToMany(mappedBy = "classroom")
    private List<Booking> bookings;
    @ManyToMany
    @JoinTable(
            name = "classroom_equipment",
            joinColumns = @JoinColumn(name = "classroom_id"),
            inverseJoinColumns = @JoinColumn(name = "equipment_id")
    )
    private Set<Equipment> equipments = new HashSet<>();
    @OneToMany(mappedBy = "classroom")
    private List<Availability> availabilities;
}