import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { UserService } from '../../services/user.service';
import { ClassroomService } from '../../services/classroom.service';
import { Booking } from '../../models/booking';
import { User } from '../../models/user';
import { Classroom } from '../../models/classroom';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent implements OnInit {
  bookings: Booking[] = [];
  selectedBooking: Booking | null = null;
  newBooking: Partial<Booking> = {
    startDate: '',
    endDate: '',
    state: '',
    reason: '',
    user: undefined,
    classroom: undefined
  };
  errorMsg: string = '';
  users: User[] = [];
  classrooms: Classroom[] = [];

  constructor(
    private bookingService: BookingService,
    private userService: UserService,
    private classroomService: ClassroomService
  ) {}

  ngOnInit() {
    this.getBookings();
    this.userService.getAllUsers().subscribe(data => this.users = data);
    this.classroomService.getAllClassrooms().subscribe(data => this.classrooms = data);
  }

  getBookings() {
    this.bookingService.getAllBookings().subscribe(data => this.bookings = data);
  }

  saveBooking() {
    if (!this.newBooking.user || !this.newBooking.classroom) {
      this.errorMsg = 'Debes seleccionar usuario y aula.';
      return;
    }
    if (this.isOverlapping(this.newBooking.startDate!, this.newBooking.endDate!, this.newBooking.classroom!)) {
      this.errorMsg = 'Ya existe una reserva para ese aula y franja horaria.';
      return;
    }
    const state = this.calcularEstadoReserva(this.newBooking.startDate!, this.newBooking.endDate!);
    const bookingToSend: any = {
      startDate: this.newBooking.startDate,
      endDate: this.newBooking.endDate,
      reason: this.newBooking.reason,
      state,
      user: { id: this.newBooking.user.id },
      classroom: { id: this.newBooking.classroom.id }
    };

    this.bookingService.saveBooking(bookingToSend as Booking).subscribe({
      next: booking => {
        
        const user = this.users.find(u => u.id === booking.user.id);
        const classroom = this.classrooms.find(c => c.id === booking.classroom.id);
        booking.user = user!;
        booking.classroom = classroom!;
        this.bookings.push(booking);
        this.newBooking = { startDate: '', endDate: '', state: '', reason: '', user: undefined, classroom: undefined };
        this.errorMsg = '';
      }
    });
  }

  editBooking(booking: Booking) {
    this.selectedBooking = { ...booking };
    this.errorMsg = '';
  }

  updateBooking() {
    if (!this.selectedBooking?.user || !this.selectedBooking?.classroom) {
      this.errorMsg = 'Debes seleccionar usuario y aula.';
      return;
    }
    if (
      this.selectedBooking &&
      this.isOverlapping(
        this.selectedBooking.startDate,
        this.selectedBooking.endDate,
        this.selectedBooking.classroom,
        this.selectedBooking.id
      )
    ) {
      this.errorMsg = 'Ya existe una reserva para ese aula y franja horaria.';
      return;
    }
    const state = this.calcularEstadoReserva(this.selectedBooking.startDate, this.selectedBooking.endDate);
    const bookingToSend = {
      ...this.selectedBooking,
      user: { id: this.selectedBooking.user.id },
      classroom: { id: this.selectedBooking.classroom.id },
      state
    };
    this.bookingService.updateBooking(bookingToSend as Booking).subscribe({
      next: updated => {
        const idx = this.bookings.findIndex(b => b.id === updated.id);
        if (idx > -1) this.bookings[idx] = updated;
        this.selectedBooking = null;
        this.errorMsg = '';
      }
    });
  }

  deleteBooking(id: number) {
    this.bookingService.deleteBookingById(id).subscribe({
      next: () => this.bookings = this.bookings.filter(b => b.id !== id)
    });
  }

  cancelEdit() {
    this.selectedBooking = null;
    this.errorMsg = '';
  }

  isOverlapping(start: string, end: string, classroom: any, ignoreId?: number): boolean {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return this.bookings.some(b =>
      b.classroom.id === classroom.id &&
      (!ignoreId || b.id !== ignoreId) &&
      (
        (startDate < new Date(b.endDate) && endDate > new Date(b.startDate))
      )
    );
  }

  private calcularEstadoReserva(startDate: string, endDate: string): string {
    const ahora = new Date();
    const inicio = new Date(startDate);
    const fin = new Date(endDate);

    if (fin < ahora) {
      return 'PASADA';
    } else if (inicio > ahora) {
      return 'PENDIENTE';
    } else {
      return 'EN_CURSO';
    }
  }
}
