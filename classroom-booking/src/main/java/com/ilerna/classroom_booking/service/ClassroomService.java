package com.ilerna.classroom_booking.service;

import java.util.List;


public interface ClassroomService {
    ClassroomService saveClassroom(ClassroomService classroom);
    ClassroomService getClassroomById(Long id);
    List<ClassroomService> getAllClassrooms();
    ClassroomService updateClassroom(ClassroomService classroom);
    void deleteClassroomById(Long id);

}
