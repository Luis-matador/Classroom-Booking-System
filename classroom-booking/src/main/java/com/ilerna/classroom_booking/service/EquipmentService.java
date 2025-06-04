package com.ilerna.classroom_booking.service;

import java.util.List;

public interface EquipmentService {
    EquipmentService saveEquipment(EquipmentService equipment);
    EquipmentService getEquipmentById(Long id);
    List<EquipmentService> getAllEquipments();
    EquipmentService updateEquipment(EquipmentService equipment);
    void deleteEquipmentById(Long id);
}
