package com.ilerna.classroom_booking.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonIgnoreProperties("aulas") // Corregido: debe coincidir con la propiedad en ClassroomType
    private ClassroomType type;

    @OneToMany(mappedBy = "classroom")
    @JsonIgnoreProperties("classroom")
    private List<Booking> bookings;

    @ManyToMany
    @JoinTable(
            name = "classroom_equipment",
            joinColumns = @JoinColumn(name = "classroom_id"),
            inverseJoinColumns = @JoinColumn(name = "equipment_id")
    )
    @com.fasterxml.jackson.annotation.JsonIgnore // Oculta equipments en la serialización
    private Set<Equipment> equipments = new HashSet<>();

    @OneToMany(mappedBy = "classroom")
    @JsonIgnoreProperties("classroom")
    private List<Availability> availabilities;
}
