import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasksSignal = signal([
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ])

  changeHandler(event: Event) {
    const input = event.target as  HTMLInputElement
    const newTask = input.value
    this.tasksSignal.update((tasksSignal) => [...tasksSignal, newTask]) // No mutar sino crear nuevos estados
    // {{  }} Strign interpolation
    // ... Spread operator
  }
  deleteTask(index: number) {
    this.tasksSignal.update((tasksSignal) => tasksSignal.filter((task, position) => position !== index))
  }
}
