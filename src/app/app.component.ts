import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-app'
  welcome = 'Bienvenido a mi primero aplicación con Angular';
  tasks = [
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ]
}
