import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Availability } from '../models/availability';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private baseUrl = 'http://localhost:8080/availability';

  constructor(private http: HttpClient) { }

  getAllAvailabilities(): Observable<Availability[]> {
    return this.http.get<Availability[]>(this.baseUrl);
  }

  getAvailabilityById(id: number): Observable<Availability> {
    return this.http.get<Availability>(`${this.baseUrl}/${id}`);
  }

  saveAvailability(availability: Availability): Observable<Availability> {
    return this.http.post<Availability>(this.baseUrl, availability);
  }

  updateAvailability(availability: Availability): Observable<Availability> {
    return this.http.put<Availability>(`${this.baseUrl}/${availability.id}`, availability);
  }

  deleteAvailabilityById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
