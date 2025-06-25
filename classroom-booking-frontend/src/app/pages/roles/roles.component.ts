import { Component, OnInit } from '@angular/core';
import { Rol } from '../../models/rol';
import { RolService } from '../../services/rol.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: Rol[] = [];
  selectedRol: Rol | null = null;
  newRol: Rol = { rolName: '', description: '', users: [] };

  constructor(private rolService: RolService) {}

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.rolService.getAllRoles().subscribe(data => this.roles = data);
  }

  saveRol() {
    if (this.newRol.rolName && this.newRol.description) {
      const rolToSave: any = { ...this.newRol };
      delete rolToSave.id;
      this.rolService.saveRol(rolToSave).subscribe({
        next: rol => {
          this.roles.push(rol);
          this.newRol = { rolName: '', description: '', users: [] }; // Reinicia sin id
        }
      });
    }
  }

  editRol(rol: Rol) {
    this.selectedRol = { ...rol };
  }

  updateRol() {
    if (this.selectedRol) {
      this.rolService.updateRol(this.selectedRol).subscribe({
        next: updated => {
          const idx = this.roles.findIndex(r => r.id === updated.id);
          if (idx > -1) this.roles[idx] = updated;
          this.selectedRol = null;
        }
      });
    }
  }

  deleteRol(id: number) {
    this.rolService.deleteRolById(id).subscribe({
      next: () => this.roles = this.roles.filter(r => r.id !== id)
    });
  }

  cancelEdit() {
    this.selectedRol = null;
  }
}
