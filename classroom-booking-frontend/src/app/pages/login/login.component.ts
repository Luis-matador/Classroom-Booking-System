import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { ReactiveFormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [ReactiveFormsModule]
})
export class LoginComponent {
    loginForm: FormGroup;
    registerForm: FormGroup;
    loginError: string = '';
    registerError: string = '';
    registerSuccess: string = '';

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
        this.registerForm = this.fb.group({
            name: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rol: ['', Validators.required]
        });
    }

    onLogin() {
        this.loginError = '';
        if (this.loginForm.invalid) return;

        const { email, password } = this.loginForm.value;
        this.userService.findByEmail(email).subscribe({
            next: (user: User) => {
                if (user && user.password === password) {
                    // Aquí puedes guardar el usuario en localStorage o un servicio de sesión
                    this.router.navigate(['/home']);
                } else {
                    this.loginError = 'Credenciales incorrectas.';
                }
            },
            error: () => {
                this.loginError = 'Usuario no encontrado.';
            }
        });
    }

    onRegister() {
        console.log('Intentando registrar...');
        console.log(this.registerForm.value);
        console.log(this.registerForm.valid);
        this.registerError = '';
        this.registerSuccess = '';
        if (this.registerForm.invalid) {
            this.registerError = 'Por favor, complete todos los campos correctamente.';
            return;
        }
        const { name, lastName, email, password, rol } = this.registerForm.value;
        this.userService.findByEmail(email).pipe(
            catchError(err => {
                if (err.status === 404) {
                    // Usuario no existe, devolvemos null para continuar el flujo
                    return of(null);
                }
                // Otros errores, los relanzamos
                throw err;
            })
        ).subscribe({
            next: (user) => {
                if (user) {
                    this.registerError = 'Ya existe un usuario con ese correo.';
                } else {
                    // Aquí creas el usuario normalmente
                    const newUser: User = {
                        id: 0,
                        name,
                        lastName,
                        email,
                        password,
                        rol: { id: Number(rol), rolName: '', description: '', users: [] },
                        reservations: []
                    };
                    this.userService.saveUser(newUser).subscribe({
                        next: () => {
                            this.registerSuccess = 'Usuario registrado correctamente. Ahora puedes iniciar sesión.';
                            this.registerForm.reset();
                        },
                        error: () => {
                            this.registerError = 'Error al registrar usuario.';
                        }
                    });
                }
            },
            error: () => {
                this.registerError = 'Error al comprobar el correo.';
            }
        });
    }
}