import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../../components/game-card/game-card.component'; 
import { DataService, JuegoDestacado } from '../../services/data.service';
import { Observable, map } from 'rxjs'; 

@Component({
  selector: 'app-tcg',
  standalone: true,
  imports: [CommonModule, GameCardComponent], 
  templateUrl: './tcg.component.html',
  styleUrls: ['./tcg.component.css']
})
export class TCGComponent implements OnInit {
  juegosTCG$: Observable<JuegoDestacado[]>; 

  constructor(private dataService: DataService) {
    this.juegosTCG$ = new Observable<JuegoDestacado[]>(); 
  }

  ngOnInit(): void {
    this.juegosTCG$ = this.dataService.getTodosLosJuegos().pipe(
      map(juegos => juegos.filter(juego => juego.categoria === 'TCG'))
    );
  }
}