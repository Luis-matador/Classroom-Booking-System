import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, CalendarEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { BookingService } from '../../services/booking.service';

@Component({
  standalone: true,
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
  imports: [CommonModule, CalendarModule]
})
export class ReservationListComponent {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  currentUserId = 1;
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];

  constructor(private bookingService: BookingService) {
    this.loadReservations();
  }

  loadReservations(): void {
    this.bookingService.getAllBookings().subscribe(
      (histories) => {
        console.log('Reservas recibidas:', histories);
        this.markReservationsInCalendar(histories);
        console.log('Eventos generados:', this.events);
        this.refresh.next(true);
      },
      (error) => {
        console.error('Error loading reservation histories:', error);
      }
    );
  }

  markReservationsInCalendar(histories: any[]): void {
    this.events = histories.map(history => {
      let start: Date;
      let end: Date;
      if (Array.isArray(history.startDate)) {
        const [year, month, day, hour, minute] = history.startDate;
        start = new Date(year, month - 1, day, hour, minute);
      } else {
        start = new Date(history.startDate);
      }
      if (Array.isArray(history.endDate)) {
        const [year, month, day, hour, minute] = history.endDate;
        end = new Date(year, month - 1, day, hour, minute);
      } else {
        end = new Date(history.endDate);
      }
      const isCurrentUser = history.user.id === this.currentUserId;

      return {
        start,
        end,
        title: `${history.classroom.name} | ${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} | ${history.user.name} ${history.user.lastName}`,
        color: isCurrentUser
          ? { primary: '#1e90ff', secondary: '#D1E8FF' }
          : { primary: '#ad2121', secondary: '#FAE3E3' }
      };
    });
  }

  previousMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
  }

  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
  }

  today(): void {
    this.viewDate = new Date();
  }

  goHome() {
    window.location.href = '/home';
  }

  /**
   * Devuelve el mes actual en formato 1-12
   */
  getMonthLabel(): number {
    return this.viewDate.getMonth() + 1;
  }

  get formattedMonth(): string {
    return this.viewDate.toLocaleDateString('es-ES', {
      month: 'long',
      year: 'numeric'
    });
  }

  onEventClicked({ event }: { event: CalendarEvent }): void {
    alert(event.title);
  }
}
