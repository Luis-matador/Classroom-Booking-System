package com.ilerna.classroom_booking.service.Implements;

import com.ilerna.classroom_booking.model.Classroom;
import com.ilerna.classroom_booking.model.ClassroomType;
import com.ilerna.classroom_booking.repository.ClassroomTypeRepository;
import com.ilerna.classroom_booking.service.ClassroomTypeService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClassroomTypeImpl implements ClassroomTypeService {

    private final ClassroomTypeRepository classroomTypeRepository;

    public ClassroomTypeImpl(ClassroomTypeRepository classroomTypeRepository) {
        this.classroomTypeRepository = classroomTypeRepository;
    }

    @Transactional
    @Override
    public ClassroomType saveClassroomType(ClassroomType classroomType) {
        if (classroomType.getNombreTipo() == null || classroomType.getNombreTipo().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del tipo de clase no puede estar vacío");
        }

        if (classroomTypeRepository.findAll().stream()
                .anyMatch(ct -> ct.getNombreTipo().equalsIgnoreCase(classroomType.getNombreTipo()))) {
            throw new IllegalArgumentException("Ya existe un tipo de clase con ese nombre");
        }

        if (classroomType.getDescripcion() != null && classroomType.getDescripcion().length() > 500) {
            throw new IllegalArgumentException("La descripción no puede exceder los 500 caracteres");
        }
    
        return classroomTypeRepository.save(classroomType);
    }

    @Override
    public Optional<ClassroomType> getClassroomTypeById(Long id) {
        return classroomTypeRepository.findById(id);
    }

    @Override
    public List<ClassroomType> getAllClassroomTypes() {
        return classroomTypeRepository.findAll();
    }

    @Transactional
    @Override
    public ClassroomType updateClassroomType(Long id, ClassroomType classroomType) {
        ClassroomType existingClassroomType = getClassroomTypeById(id).orElseThrow(() -> new IllegalArgumentException("Tipo de la clase no encontrada con id: " + id));

        existingClassroomType.setNombreTipo(classroomType.getNombreTipo());
        existingClassroomType.setDescripcion(classroomType.getDescripcion());
        existingClassroomType.setAulas(classroomType.getAulas());

        return classroomTypeRepository.save(existingClassroomType);
    }

    @Transactional
    @Override
    public void deleteClassroomTypeById(Long id) {
        ClassroomType classroomType = getClassroomTypeById(id).orElseThrow(() -> new IllegalArgumentException("Tipo de clase no encontrada con id: " + id));
        classroomTypeRepository.delete(classroomType);
    }
}
