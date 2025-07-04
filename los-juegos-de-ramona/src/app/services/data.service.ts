import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface JuegoDestacado { 
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private jsonUrl = 'assets/data/todos_los_juegos.json';

  constructor(private http: HttpClient) { }

  getTodosLosJuegos(): Observable<JuegoDestacado[]> { 
    return this.http.get<JuegoDestacado[]>(this.jsonUrl);
  }
}