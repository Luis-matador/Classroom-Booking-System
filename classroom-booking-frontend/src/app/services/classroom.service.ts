import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ Classroom } from '../models/classroom';

@Injectable({
  providedIn: 'root'
})

export class ClassroomService {
  private baseUrl = 'http://localhost:8080/classrooms';

  constructor(private http: HttpClient) { }

  createClassroom(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>(this.baseUrl, classroom);
  }

  getClassroomById(id: number): Observable<Classroom> {
    return this.http.get<Classroom>(`${this.baseUrl}/${id}`);
  }

  getAllClassrooms(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.baseUrl);
  }

  updateClassroom(id: number, classroom: Classroom): Observable<Classroom> {
    return this.http.put<Classroom>(`${this.baseUrl}/${id}`, classroom);
  }

  deleteClassroom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
