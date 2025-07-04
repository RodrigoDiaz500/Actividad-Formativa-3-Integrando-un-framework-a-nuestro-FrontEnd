import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryGridComponent } from '../../components/category-grid/category-grid.component'; // ¡IMPORTAR AQUÍ!

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CategoryGridComponent 
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}