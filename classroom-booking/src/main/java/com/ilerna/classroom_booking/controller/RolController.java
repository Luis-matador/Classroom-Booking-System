package com.ilerna.classroom_booking.controller;

import com.ilerna.classroom_booking.model.Rol;
import com.ilerna.classroom_booking.service.RolService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/roles")
public class RolController {

    private final RolService rolService;

    public RolController(RolService rolService) {
        this.rolService = rolService;
    }

    @PostMapping
    public ResponseEntity<Rol> saveRol(@RequestBody Rol rol) {
        Rol savedRol = rolService.saveRol(rol);
        return ResponseEntity.status(201).body(savedRol);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rol> getRolById(@PathVariable Long id) {
        Optional<Rol> rol = rolService.getRolById(id);
        return rol.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Rol>> getAllRoles() {
        List<Rol> roles = rolService.getAllRoles();
        return ResponseEntity.ok(roles);
    }

    @PutMapping
    public ResponseEntity<Rol> updateRol(@RequestBody Rol rol) {
        Rol updatedRol = rolService.updateRol(rol);
        if (updatedRol == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedRol);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRolById(@PathVariable Long id) {
        rolService.deleteRolById(id);
        return ResponseEntity.noContent().build();
    }
}