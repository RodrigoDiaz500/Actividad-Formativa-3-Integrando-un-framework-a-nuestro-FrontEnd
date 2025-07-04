import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { JuegoDestacado } from '../../services/data.service'; 

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent {
  @Input() juego!: JuegoDestacado; 
}