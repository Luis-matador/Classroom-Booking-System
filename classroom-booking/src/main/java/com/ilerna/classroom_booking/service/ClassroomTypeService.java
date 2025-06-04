package com.ilerna.classroom_booking.service;

import java.util.List;

public interface ClassroomTypeService {
    ClassroomTypeService saveClassroomType(ClassroomTypeService classroomType);
    ClassroomTypeService getClassroomTypeById(Long id);
    List<ClassroomTypeService> getAllClassroomTypes();
    ClassroomTypeService updateClassroomType(ClassroomTypeService classroomType);
    void deleteClassroomTypeById(Long id);
}
