// src/app/pages/rol/rol.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngFor
import { GameCardComponent } from '../../components/game-card/game-card.component'; // Importa el componente de tarjeta de juego
import { DataService, JuegoDestacado } from '../../services/data.service'; // Importa el servicio y la interfaz
import { Observable, map } from 'rxjs'; // Importa Observable y map para manejar los datos

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [CommonModule, GameCardComponent], // Añade CommonModule y GameCardComponent a imports
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  juegosRol$: Observable<JuegoDestacado[]>; // Observable para almacenar los juegos de Rol

  constructor(private dataService: DataService) {
    this.juegosRol$ = new Observable<JuegoDestacado[]>(); // Inicializa el observable
  }

  ngOnInit(): void {
    // Llama al servicio para obtener todos los juegos
    this.juegosRol$ = this.dataService.getTodosLosJuegos().pipe(
      // Usa el operador map de RxJS para filtrar los juegos por categoría
      map(juegos => juegos.filter(juego => juego.categoria === 'Juegos de Rol'))
    );
  }
}