// src/app/pages/tcg/tcg.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngFor
import { GameCardComponent } from '../../components/game-card/game-card.component'; // Importa el componente de tarjeta de juego
import { DataService, JuegoDestacado } from '../../services/data.service'; // Importa el servicio y la interfaz
import { Observable, map } from 'rxjs'; // Importa Observable y map para manejar los datos

@Component({
  selector: 'app-tcg',
  standalone: true,
  imports: [CommonModule, GameCardComponent], // Añade CommonModule y GameCardComponent a imports
  templateUrl: './tcg.component.html',
  styleUrls: ['./tcg.component.css']
})
export class TCGComponent implements OnInit {
  juegosTCG$: Observable<JuegoDestacado[]>; // Observable para almacenar los juegos de TCG

  constructor(private dataService: DataService) {
    this.juegosTCG$ = new Observable<JuegoDestacado[]>(); // Inicializa el observable
  }

  ngOnInit(): void {
    // Llama al servicio para obtener todos los juegos
    this.juegosTCG$ = this.dataService.getTodosLosJuegos().pipe(
      // Usa el operador map de RxJS para filtrar los juegos por categoría
      map(juegos => juegos.filter(juego => juego.categoria === 'TCG'))
    );
  }
}