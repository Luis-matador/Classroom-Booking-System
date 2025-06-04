package com.ilerna.classroom_booking.service.Implements;

import com.ilerna.classroom_booking.model.Classroom;
import com.ilerna.classroom_booking.repository.ClassroomRepository;
import com.ilerna.classroom_booking.service.ClassroomService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClassroomImpl implements ClassroomService {

    private final ClassroomRepository classroomRepository;

    public ClassroomImpl(ClassroomRepository classroomRepository) {
        this.classroomRepository = classroomRepository;
    }

    @Transactional
    @Override
    public Classroom saveClassroom(Classroom classroom) {
        if (classroom.getName() == null || classroom.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre de la clase no puede estar vacío");
        }

        if (classroom.getCapacity() == null || classroom.getCapacity() <= 0) {
            throw new IllegalArgumentException("La capacidad debe ser mayor que cero");
        }

        if (classroom.getLocation() == null || classroom.getLocation().trim().isEmpty()) {
            throw new IllegalArgumentException("La ubicación no puede estar vacía");
        }

        if (classroom.getType() == null || classroom.getType().getId() == null) {
            throw new IllegalArgumentException("El tipo de aula debe ser especificado");
        }

        return classroomRepository.save(classroom);
    }

    @Override
    public Optional<Classroom> getClassroomById(Long id) {
        return classroomRepository.findById(id);
    }

    @Override
    public List<Classroom> getAllClassrooms() {
        return classroomRepository.findAll();
    }

    @Transactional
    @Override
    public Classroom updateClassroom(Long id, Classroom classroom) {
        Classroom existingClassroom = getClassroomById(id).orElseThrow(() -> new IllegalArgumentException("Clase no encontrada con id: " + id));

        existingClassroom.setName(classroom.getName());
        existingClassroom.setCapacity(classroom.getCapacity());
        existingClassroom. setLocation(classroom.getLocation());

        return classroomRepository.save(existingClassroom);
    }

    @Transactional
    @Override
    public void deleteClassroomById(Long id) {
        Classroom classroom = getClassroomById(id).orElseThrow(() -> new IllegalArgumentException("Clase no encontrada con id: " + id));
        classroomRepository.delete(classroom);
    }
}
