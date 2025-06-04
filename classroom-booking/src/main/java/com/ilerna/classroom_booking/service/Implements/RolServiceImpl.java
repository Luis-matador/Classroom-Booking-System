package com.ilerna.classroom_booking.service.Implements;

import com.ilerna.classroom_booking.model.Rol;
import com.ilerna.classroom_booking.repository.RolRepository;
import com.ilerna.classroom_booking.service.RolService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolServiceImpl implements RolService {

    private final RolRepository rolRepository;

    public RolServiceImpl(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    @Transactional
    @Override
    public Rol saveRol(Rol rol) {
        if (rol.getRolName() == null || rol.getRolName().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del rol no puede estar vacío");
        }

        if (rolRepository.findAll().stream()
                .anyMatch(r -> r.getRolName().equalsIgnoreCase(rol.getRolName()))) {
            throw new IllegalArgumentException("Ya existe un rol con ese nombre");
        }

        if (rol.getDescription() == null || rol.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("La descripción del rol no puede estar vacía");
        }

        return rolRepository.save(rol);
    }

    @Override
    public Optional<Rol> getRolById(Long id) {
        return rolRepository.findById(id);
    }


    @Override
    public List<Rol> getAllRoles() {
        return rolRepository.findAll();
    }

    @Transactional
    @Override
    public Rol updateRol(Rol rol) {
        if (rol.getRolName() == null || rol.getRolName().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del rol no puede estar vacío");
        }

        if (rol.getDescription() == null || rol.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("La descripción del rol no puede estar vacía");
        }

        Rol existingRol = getRolById(rol.getId()).orElseThrow(() -> new IllegalArgumentException("Rol no encontrado con id: " + rol.getId()));

        if (!existingRol.getRolName().equalsIgnoreCase(rol.getRolName()) &&
                rolRepository.findAll().stream().anyMatch(r -> r.getRolName().equalsIgnoreCase(rol.getRolName()))) {
            throw new IllegalArgumentException("Ya existe un rol con ese nombre");
        }

        existingRol.setRolName(rol.getRolName());
        existingRol.setDescription(rol.getDescription());

        return rolRepository.save(existingRol);
    }

    @Transactional
    @Override
    public void deleteRolById(Long id) {
        Rol rol = getRolById(id).orElseThrow(() -> new IllegalArgumentException("Rol no encontrado con id: " + id));
        rolRepository.delete(rol);
    }
}
