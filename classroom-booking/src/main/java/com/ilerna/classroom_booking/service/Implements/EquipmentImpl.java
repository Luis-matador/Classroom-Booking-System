package com.ilerna.classroom_booking.service.Implements;

import com.ilerna.classroom_booking.model.Equipment;
import com.ilerna.classroom_booking.service.EquipmentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EquipmentImpl implements EquipmentService {

    @Override
    public Equipment saveEquipment(Equipment equipment) {
        return null;
    }

    @Override
    public Optional<Equipment> getEquipmentById(Long id) {
        return Optional.empty();
    }

    @Override
    public List<Equipment> getAllEquipments() {
        return List.of();
    }

    @Override
    public Equipment updateEquipment(Equipment equipment) {
        return null;
    }

    @Override
    public void deleteEquipmentById(Long id) {

    }
}
