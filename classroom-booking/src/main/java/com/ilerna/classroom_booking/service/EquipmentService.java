package com.ilerna.classroom_booking.service;

import com.ilerna.classroom_booking.model.Equipment;

import java.util.List;
import java.util.Optional;

public interface EquipmentService {

    Equipment saveEquipment(Equipment equipment);

    Optional<Equipment> getEquipmentById(Long id);

    List<Equipment> getAllEquipments();

    Equipment updateEquipment(Equipment equipment);

    void deleteEquipmentById(Long id);
}
