import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Task } from '../../models/task.model'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasksSignal = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear componentes',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Implementar estructura',
      completed: false
    },
    
  ])

  changeHandler(event: Event) {
    const input = event.target as  HTMLInputElement
    const newTask = input.value
    // this.tasksSignal.update((tasksSignal) => [...tasksSignal, newTask]) // No mutar sino crear nuevos estados
    // {{  }} String interpolation
    // ... Spread operator
    this.addTask(newTask)
  }
  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    }
    this.tasksSignal.update((tasksSignal) => [...tasksSignal, newTask])
  }
  completedTask(id: number) {
    const taskToUpdate = this.tasksSignal.update(task => task.id === id);

    const task = this.tasksSignal.update((this.tasksSignal.id == id) => task.completed.update = true)

    console.log(task);
  }
  deleteTask(index: number) {
    this.tasksSignal.update((tasksSignal) => tasksSignal.filter((task, position) => position !== index))
  }
}
