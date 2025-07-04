import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-category-grid', 
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.css']
})
export class CategoryGridComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}