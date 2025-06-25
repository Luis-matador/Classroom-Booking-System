import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RolService } from '../../services/rol.service'; // <-- Importa el servicio de roles
import { User } from '../../models/user';
import { Rol } from '../../models/rol';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  users: User[] = [];
  roles: Rol[] = []; // <-- Añade esta línea
  selectedUser: User | null = null;
  newUser: Partial<User> = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    rol: undefined,
    reservations: []
  };

  constructor(
    private userService: UserService,
    private rolService: RolService // <-- Inyecta el servicio de roles
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getRoles();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(data => this.users = data);
  }

  getRoles() {
    this.rolService.getAllRoles().subscribe(data => this.roles = data);
  }

  saveUser() {
    if (this.newUser.name && this.newUser.email && this.newUser.rol) {
      this.userService.saveUser(this.newUser as User).subscribe({
        next: user => {
          this.users.push(user);
          this.newUser = {
            name: '',
            lastName: '',
            email: '',
            password: '',
            rol: undefined,
            reservations: []
          };
        }
      });
    }
  }

  editUser(user: User) {
    const rolEncontrado = this.roles.find(r => r.id === user.rol?.id);
    this.selectedUser = {
      ...user,
      rol: rolEncontrado ?? this.roles[0]
    };
  }

  updateUser() {
    if (this.selectedUser && this.selectedUser.id && this.selectedUser.rol) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
        next: updated => {
          const idx = this.users.findIndex(u => u.id === updated.id);
          if (idx > -1) this.users[idx] = updated;
          this.selectedUser = null;
        }
      });
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUserById(id).subscribe({
      next: () => this.users = this.users.filter(u => u.id !== id)
    });
  }

  cancelEdit() {
    this.selectedUser = null;
  }
}

