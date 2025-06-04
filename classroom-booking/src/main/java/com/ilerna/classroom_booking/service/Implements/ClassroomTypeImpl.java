package com.ilerna.classroom_booking.service.Implements;

import com.ilerna.classroom_booking.model.ClassroomType;
import com.ilerna.classroom_booking.service.ClassroomTypeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClassroomTypeImpl implements ClassroomTypeService {

    @Override
    public ClassroomType saveClassroomType(ClassroomType classroomType) {
        return null;
    }

    @Override
    public Optional<ClassroomType> getClassroomTypeById(Long id) {
        return Optional.empty();
    }

    @Override
    public List<ClassroomType> getAllClassroomTypes() {
        return List.of();
    }

    @Override
    public ClassroomType updateClassroomType(ClassroomType classroomType) {
        return null;
    }

    @Override
    public void deleteClassroomTypeById(Long id) {

    }
}
