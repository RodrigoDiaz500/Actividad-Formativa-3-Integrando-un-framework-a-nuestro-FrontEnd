import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para directivas comunes

@Component({
  selector: 'app-header', // Este es el selector que usarás
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() pageTitle: string = ''; // Recibe el título del padre
  @Input() pageSlogan: string = ''; // Recibe el eslogan del padre
}