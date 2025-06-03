package com.ilerna.classroom_booking.model.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassroomType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nombreTipo;
    @Column(length = 500)
    private String descripcion;
    @OneToMany(mappedBy = "type")
    private List<Classroom> aulas;
}
