import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from '../../models/task.model'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
    ]
  });

  changeHandler() {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value
      this.addTask(value)
      this.newTaskCtrl.setValue('')
    }
  }
  /* changeHandler(event: Event) {
    const input = event.target as  HTMLInputElement
    const newTask = input.value
    // this.tasksSignal.update((tasksSignal) => [...tasksSignal, newTask]) // No mutar sino crear nuevos estados
    // {{  }} String interpolation
    // ... Spread operator
    this.addTask(newTask)
  } */
  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    }
    this.tasksSignal.update((tasksSignal) => [...tasksSignal, newTask])
  }
  completedTask(index: number) {
    this.tasksSignal.update((value) =>
      value.map((task, position) => {
        if (position === index)
          return {
            ...task,
            completed: !task.completed,
          };
        return task;
      })
    );
  }
  deleteTask(index: number) {
    this.tasksSignal.update((tasksSignal) => tasksSignal.filter((task, position) => position !== index))
  }

  updateTask(index: number) {
    this.tasksSignal.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }
}
