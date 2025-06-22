package com.ilerna.classroom_booking.service.Implements;

import com.ilerna.classroom_booking.model.Equipment;
import com.ilerna.classroom_booking.repository.EquipmentRepository;
import com.ilerna.classroom_booking.service.EquipmentService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EquipmentImpl implements EquipmentService {

    private final EquipmentRepository equipmentRepository;

    public EquipmentImpl(EquipmentRepository equipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }

    @Transactional
    @Override
    public Equipment saveEquipment(Equipment equipment) {
        if (equipment.getEquipmentName() == null || equipment.getEquipmentName().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del equipamiento no puede estar vacío");
        }

        if (equipmentRepository.findAll().stream()
                .anyMatch(e -> e.getEquipmentName().equalsIgnoreCase(equipment.getEquipmentName()))) {
            throw new IllegalArgumentException("Ya existe un equipamiento con ese nombre");
        }

        return equipmentRepository.save(equipment);
    }

    @Override
    public Optional<Equipment> getEquipmentById(Long id) {
        return equipmentRepository.findById(id);
    }

    @Override
    public List<Equipment> getAllEquipments() {
        return equipmentRepository.findAll();
    }

    @Transactional
    @Override
    public Equipment updateEquipment(Equipment equipment) {
        if (equipment.getId() == null || equipment.getId() <= 0) {
            throw new IllegalArgumentException("El ID del equipamiento debe ser especificado");
        }

        Optional<Equipment> existingEquipment = equipmentRepository.findById(equipment.getId());
        if (existingEquipment.isEmpty()) {
            throw new IllegalArgumentException("El equipamiento con el ID especificado no existe");
        }

        if (equipment.getEquipmentName() == null || equipment.getEquipmentName().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del equipamiento no puede estar vacío");
        }

        if (equipmentRepository.findAll().stream()
                .filter(e -> !e.getId().equals(equipment.getId()))
                .anyMatch(e -> e.getEquipmentName().equalsIgnoreCase(equipment.getEquipmentName()))) {
            throw new IllegalArgumentException("Ya existe un equipamiento con ese nombre");
        }
    
        return equipmentRepository.save(equipment);
    }

    @Transactional
    @Override
    public void deleteEquipmentById(Long id) {
        Optional<Equipment> equipment = equipmentRepository.findById(id);
        if (equipment.isEmpty()) {
            throw new IllegalArgumentException("El equipamiento con el ID especificado no existe");
        }
        equipmentRepository.deleteById(id);
    }
}
