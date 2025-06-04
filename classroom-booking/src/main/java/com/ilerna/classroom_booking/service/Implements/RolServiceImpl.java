package com.ilerna.classroom_booking.service.Implements;

import com.ilerna.classroom_booking.model.Rol;
import com.ilerna.classroom_booking.repository.RolRepository;
import com.ilerna.classroom_booking.service.RolService;
import com.ilerna.classroom_booking.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolServiceImpl implements RolService {

    private final RolRepository rolRepository;
    private RolService rolService;
    private UserService userService;

    public RolServiceImpl(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    @Override
    public Rol saveRol(Rol rol) {
        return rolRepository.save(rol);
    }

    @Override
    public Rol getRolById(Long id) {
        return null;
    }

    @Override
    public List<Rol> getAllRoles() {
        return List.of();
    }

    @Override
    public Rol updateRol(Rol rol) {
        return null;
    }

    @Override
    public void deleteRolById(Long id) {

    }
}
