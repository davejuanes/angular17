import { Component, Injector, computed, effect, inject, signal } from '@angular/core';
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
  tasksSignal = signal<Task[]>([])

  filter = signal<'all' | 'pending' | 'completed'>('all')
  tasksByFilter = computed(() => {
    const filter = this.filter()
    const tasks = this.tasksSignal()
    if (filter === 'pending')
    {
      return tasks.filter(task => !task.completed)
    }
    if (filter === 'completed')
    {
      return tasks.filter(task => task.completed)
    }
    return tasks
  })

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
    ]
  });

  // taskCtrl = new FormControl()

  // injector = inject(Injector);

  constructor() {
    effect(() => {
      localStorage.setItem('tasks', JSON.stringify(this.tasksSignal()));
    });
  }

  ngOnInit()
  {
    const storage = localStorage.getItem('tasks')
    if (storage) {
      const tasks = JSON.parse(storage)
      this.tasksSignal.set(tasks)
    }
    this.trackTasks
  }

  trackTasks()
  {
    effect(() => {
      const tasks = this.tasksSignal()
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }/* , { injector: this.injector } */)
  }

  changeHandler() {
    if (this.newTaskCtrl.valid) {
      // const value = this.newTaskCtrl.value.trim()
      const value = this.newTaskCtrl.value
      // if (value !== '') {
        this.addTask(value)
        this.newTaskCtrl.setValue('')
      // }
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

  updateTaskEditingMode(index: number) {
    this.tasksSignal.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      })
    })
  }
  
  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement
    this.tasksSignal.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
    })
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter)
  }
}
