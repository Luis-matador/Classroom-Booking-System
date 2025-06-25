import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClassroomTypeService } from '../../services/classroom-type.service';
import { ClassroomType } from '../../models/classroom-type';

@Component({
  selector: 'app-tipo-clase',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tipo-clase.component.html',
  styleUrl: './tipo-clase.component.css'
})
export class TipoClaseComponent implements OnInit {
  tiposClase: ClassroomType[] = [];
  selectedTipo: ClassroomType | null = null;
  newTipo: Partial<ClassroomType> = {
    nombreTipo: '',
    descripcion: ''
  };

  constructor(private classroomTypeService: ClassroomTypeService) {}

  ngOnInit() {
    this.getTiposClase();
  }

  getTiposClase() {
    this.classroomTypeService.getAllClassroomTypes().subscribe(data => this.tiposClase = data);
  }

  saveTipo() {
    if (this.newTipo.nombreTipo) {
      this.classroomTypeService.createClassroomType(this.newTipo as ClassroomType).subscribe({
        next: tipo => {
          this.tiposClase.push(tipo);
          this.newTipo = { nombreTipo: '', descripcion: '' };
        }
      });
    }
  }

  editTipo(tipo: ClassroomType) {
    this.selectedTipo = { ...tipo };
  }

  updateTipo() {
    if (this.selectedTipo && this.selectedTipo.id) {
      this.classroomTypeService.updateClassroomType(this.selectedTipo.id, this.selectedTipo).subscribe({
        next: updated => {
          const idx = this.tiposClase.findIndex(t => t.id === updated.id);
          if (idx > -1) this.tiposClase[idx] = updated;
          this.selectedTipo = null;
        }
      });
    }
  }

  deleteTipo(id: number) {
    this.classroomTypeService.deleteClassroomType(id).subscribe({
      next: () => this.tiposClase = this.tiposClase.filter(t => t.id !== id)
    });
  }

  cancelEdit() {
    this.selectedTipo = null;
  }
}
