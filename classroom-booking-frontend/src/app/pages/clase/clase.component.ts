import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClassroomService } from '../../services/classroom.service';
import { ClassroomTypeService } from '../../services/classroom-type.service';
import { Classroom } from '../../models/classroom';
import { ClassroomType } from '../../models/classroom-type';

@Component({
  selector: 'app-clase',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './clase.component.html',
  styleUrl: './clase.component.css'
})
export class ClaseComponent implements OnInit {
  classrooms: Classroom[] = [];
  selectedClassroom: Classroom | null = null;
  newClassroom: Partial<Classroom> = {
    name: '',
    capacity: 0,
    location: '',
    type: undefined,
    bookings: [],
  };
  classroomTypes: ClassroomType[] = [];

  constructor(
    private classroomService: ClassroomService,
    private classroomTypeService: ClassroomTypeService
  ) {}

  ngOnInit() {
    this.getClassrooms();
    this.classroomTypeService.getAllClassroomTypes().subscribe(data => this.classroomTypes = data);
  }

  getClassrooms() {
    this.classroomService.getAllClassrooms().subscribe(data => this.classrooms = data);
  }

  saveClassroom() {
    if (this.newClassroom.name && this.newClassroom.capacity && this.newClassroom.location && this.newClassroom.type) {
      this.classroomService.createClassroom(this.newClassroom as Classroom).subscribe({
        next: classroom => {
          this.classrooms.push(classroom);
          this.newClassroom = { name: '', capacity: 0, location: '', type: undefined, bookings: []};
        }
      });
    }
  }

  editClassroom(classroom: Classroom) {
    this.selectedClassroom = { ...classroom };
  }

  updateClassroom() {
    if (this.selectedClassroom && this.selectedClassroom.id) {
      this.classroomService.updateClassroom(this.selectedClassroom.id, this.selectedClassroom).subscribe({
        next: updated => {
          const idx = this.classrooms.findIndex(c => c.id === updated.id);
          if (idx > -1) this.classrooms[idx] = updated;
          this.selectedClassroom = null;
        }
      });
    }
  }

  deleteClassroom(id: number) {
    this.classroomService.deleteClassroom(id).subscribe({
      next: () => this.classrooms = this.classrooms.filter(c => c.id !== id)
    });
  }

  cancelEdit() {
    this.selectedClassroom = null;
  }
}
