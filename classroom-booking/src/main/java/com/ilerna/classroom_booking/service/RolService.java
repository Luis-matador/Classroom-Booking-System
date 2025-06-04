package com.ilerna.classroom_booking.service;

import com.ilerna.classroom_booking.model.Rol;

import java.util.List;
import java.util.Optional;

public interface RolService {
    Rol saveRol(Rol rol);
    Optional<Rol> getRolById(Long id);
    List<Rol> getAllRoles();
    Rol updateRol(Rol rol);
    void deleteRolById(Long id);
}
