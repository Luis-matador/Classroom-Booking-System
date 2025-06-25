import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassroomType } from '../models/classroom-type';


@Injectable({
  providedIn: 'root'
})

export class ClassroomTypeService {
  private baseUrl = 'http://localhost:8080/classroom-types';

  constructor(private http: HttpClient) { }

  createClassroomType(classroomType: ClassroomType): Observable<ClassroomType> {
    return this.http.post<ClassroomType>(this.baseUrl, classroomType);
  }

  getClassroomTypeById(id: number): Observable<ClassroomType> {
    return this.http.get<ClassroomType>(`${this.baseUrl}/${id}`);
  }

  getAllClassroomTypes(): Observable<ClassroomType[]> {
    return this.http.get<ClassroomType[]>(this.baseUrl);
  }

  updateClassroomType(id: number, classroomType: ClassroomType): Observable<ClassroomType> {
    return this.http.put<ClassroomType>(`${this.baseUrl}/${id}`, classroomType);
  }

  deleteClassroomType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
