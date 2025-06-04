package com.ilerna.classroom_booking.repository;

import com.ilerna.classroom_booking.model.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
}
