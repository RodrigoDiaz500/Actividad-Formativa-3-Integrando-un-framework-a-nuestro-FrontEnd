// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para la estructura de un juego
export interface JuegoDestacado { // Renombré de "JuegoDestacado" a "Juego" para ser más genérico
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
  // **¡Actualiza esta ruta a tu nuevo archivo JSON!**
  private jsonUrl = 'assets/data/todos_los_juegos.json';

  constructor(private http: HttpClient) { }

  // Este método ahora traerá *todos* los juegos
  getTodosLosJuegos(): Observable<JuegoDestacado[]> { // Renombré el método para mayor claridad
    return this.http.get<JuegoDestacado[]>(this.jsonUrl);
  }
}