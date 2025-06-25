import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReservationListComponent } from './pages/reservation-list/reservation-list.component';
import { BookingComponent } from './pages/booking/booking.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RolesComponent } from './pages/roles/roles.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { TipoClaseComponent } from './pages/tipo-clase/tipo-clase.component';
import { ClaseComponent } from './pages/clase/clase.component';
import { ReservasComponent } from './pages/reservas/reservas.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'reservations', component: ReservationListComponent, canActivate: [AuthGuard] },
    { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
    { path: 'roles', component: RolesComponent, canActivate: [AuthGuard] },
    { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
    { path: 'tipo-clase', component: TipoClaseComponent, canActivate: [AuthGuard] },
    { path: 'clase', component: ClaseComponent, canActivate: [AuthGuard] },
    { path: 'reservas', component: ReservasComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login' }
];
