import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter, CalendarEvent, CalendarView } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Subject } from 'rxjs';
import { ReservationHistoryService } from '../../services/reservation-history.service';

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

  constructor(private reservationHistoryService: ReservationHistoryService) {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationHistoryService.getAllReservationHistories().subscribe(
      (histories) => {
        this.events = histories.map(history => {
          const start = new Date(history.booking.startDate);
          const end = new Date(history.booking.endDate);
          const isCurrentUser = history.user.id === this.currentUserId;

          return {
            start,
            end,
            title: `${history.booking.classroom.name} | ${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} | ${history.user.name} ${history.user.lastName}`,
            color: isCurrentUser
              ? { primary: '#1e90ff', secondary: '#D1E8FF' }
              : { primary: '#ad2121', secondary: '#FAE3E3' }
          };
        });

        this.refresh.next(true);
      },
      (error) => {
        console.error('Error loading reservation histories:', error);
      }
    );
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

  goHome(): void {
    window.location.href = '/home'; // O usa router.navigate(['/home']) si tienes routing
  }

  get formattedMonth(): string {
    return this.viewDate.toLocaleDateString('es-ES', {
      month: 'long',
      year: 'numeric'
    });
  }
}
