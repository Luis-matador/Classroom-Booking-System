import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationHistory } from '../models/reservation-history';

@Injectable({
  providedIn: 'root'
})
export class ReservationHistoryService {
  private apiUrl = 'http://localhost:8080/reservation-histories';

  constructor(private http: HttpClient) { }

  saveReservationHistory(reservationHistory: ReservationHistory): Observable<ReservationHistory> {
    return this.http.post<ReservationHistory>(this.apiUrl, reservationHistory);
  }

  getReservationHistoryById(id: number): Observable<ReservationHistory> {
    return this.http.get<ReservationHistory>(`${this.apiUrl}/${id}`);
  }

  getAllReservationHistories(): Observable<ReservationHistory[]> {
    return this.http.get<ReservationHistory[]>(this.apiUrl);
  }

  updateReservationHistory(reservationHistory: ReservationHistory): Observable<ReservationHistory> {
    return this.http.put<ReservationHistory>(this.apiUrl, reservationHistory);
  }

  deleteReservationHistoryById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
