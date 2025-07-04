// src/app/components/game-card/game-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para pipes como 'number'
import { JuegoDestacado } from '../../services/data.service'; // Importa la interfaz del juego

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule], // Importa CommonModule
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent {
  @Input() juego!: JuegoDestacado; // Recibe un objeto de tipo Juego
}