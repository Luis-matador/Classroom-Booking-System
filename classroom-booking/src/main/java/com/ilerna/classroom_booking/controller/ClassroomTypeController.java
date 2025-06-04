package com.ilerna.classroom_booking.controller;

import com.ilerna.classroom_booking.model.ClassroomType;
import com.ilerna.classroom_booking.service.ClassroomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/classroom-types")
public class ClassroomTypeController {

    private final ClassroomTypeService classroomTypeService;

    @Autowired
    public ClassroomTypeController(ClassroomTypeService classroomTypeService) {
        this.classroomTypeService = classroomTypeService;
    }

    @PostMapping
    public ResponseEntity<ClassroomType> createClassroomType(@RequestBody ClassroomType classroomType) {
        try {
            ClassroomType savedClassroomType = classroomTypeService.saveClassroomType(classroomType);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedClassroomType);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClassroomType> getClassroomTypeById(@PathVariable Long id) {
        return classroomTypeService.getClassroomTypeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<ClassroomType>> getAllClassroomTypes() {
        List<ClassroomType> classroomTypes = classroomTypeService.getAllClassroomTypes();
        return ResponseEntity.ok(classroomTypes);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClassroomType> updateClassroomType(@PathVariable Long id, @RequestBody ClassroomType classroomType) {
        try {
            classroomType.setId(id);
            ClassroomType updatedClassroomType = classroomTypeService.updateClassroomType(id, classroomType);
            return ResponseEntity.ok(updatedClassroomType);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClassroomType(@PathVariable Long id) {
        try {
            classroomTypeService.deleteClassroomTypeById(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
