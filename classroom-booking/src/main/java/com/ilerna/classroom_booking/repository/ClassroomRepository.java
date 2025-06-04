package com.ilerna.classroom_booking.repository;

import com.ilerna.classroom_booking.model.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassroomRepository extends JpaRepository<Classroom, Long> {
}
