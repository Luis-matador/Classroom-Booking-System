package com.ilerna.classroom_booking.service;

import com.ilerna.classroom_booking.model.ClassroomType;

import java.util.List;
import java.util.Optional;

public interface ClassroomTypeService {
    ClassroomType saveClassroomType(ClassroomType classroomType);

    Optional<ClassroomType> getClassroomTypeById(Long id);

    List<ClassroomType> getAllClassroomTypes();

    ClassroomType updateClassroomType(Long id, ClassroomType classroomType);

    void deleteClassroomTypeById(Long id);
}
