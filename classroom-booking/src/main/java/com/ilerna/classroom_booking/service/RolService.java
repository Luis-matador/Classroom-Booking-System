package com.ilerna.classroom_booking.service;

import com.ilerna.classroom_booking.model.Rol;

import java.util.List;

public interface RolService {
    Rol saveRol(Rol rol);
    Rol getRolById(Long id);
    List<Rol> getAllRoles();
    Rol updateRol(Rol rol);
    void deleteRolById(Long id);
}
