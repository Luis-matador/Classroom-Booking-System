package com.ilerna.classroom_booking.service.Implements;

import com.ilerna.classroom_booking.model.Classroom;
import com.ilerna.classroom_booking.service.ClassroomService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClassroomImpl implements ClassroomService {

    @Override
    public Classroom saveClassroom(Classroom classroom) {
        return null;
    }

    @Override
    public Optional<Classroom> getClassroomById(Long id) {
        return Optional.empty();
    }

    @Override
    public List<Classroom> getAllClassrooms() {
        return List.of();
    }

    @Override
    public Classroom updateClassroom(Classroom classroom) {
        return null;
    }

    @Override
    public void deleteClassroomById(Long id) {

    }
}
