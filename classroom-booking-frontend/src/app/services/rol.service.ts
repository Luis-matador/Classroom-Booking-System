import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private apiUrl = 'http://localhost:8080/roles';

  constructor(private http: HttpClient) { }

  saveRol(rol: Rol): Observable<Rol> {
  return this.http.post<Rol>(this.apiUrl, rol);
  }

  getRolById(id: number): Observable<Rol> {
  return this.http.get<Rol>(`${this.apiUrl}/${id}`);
  }

  getAllRoles(): Observable<Rol[]> {
  return this.http.get<Rol[]>(this.apiUrl);
  }

  updateRol(rol: Rol): Observable<Rol> {
  return this.http.put<Rol>(this.apiUrl, rol);
  }

  deleteRolById(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
