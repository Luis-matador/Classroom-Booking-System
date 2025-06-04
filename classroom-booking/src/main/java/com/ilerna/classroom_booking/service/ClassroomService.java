package com.ilerna.classroom_booking.service;

import com.ilerna.classroom_booking.model.Classroom;

import java.util.List;
import java.util.Optional;


public interface ClassroomService {
    Classroom saveClassroom(Classroom classroom);

    Optional<Classroom> getClassroomById(Long id);

    List<Classroom> getAllClassrooms();

    Classroom updateClassroom(Classroom classroom);

    void deleteClassroomById(Long id);

}
