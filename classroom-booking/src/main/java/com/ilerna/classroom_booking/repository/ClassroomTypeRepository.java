package com.ilerna.classroom_booking.repository;

import com.ilerna.classroom_booking.model.ClassroomType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassroomTypeRepository extends JpaRepository<ClassroomType, Long> {
}
