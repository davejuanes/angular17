import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Bienvenido a mi primero aplicación con Angular';
  tasks = [
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ]
  name = 'David'
  age = '32'
  private ages = '32' // Solo funciona dentro de la clase
  disabled = true
  img = 'https://w3schools.com/howto/img_avatar.png'

  person = signal({
    name: 'Dave Juanes',
    age: 15,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  })

  colorCtrl = new FormControl();

  constructor() {
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value);
      
    })
  }

  clickHandler() {
    alert('Hello Dave')
  }

  nameSignal = signal('Dave')
  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement
    const newValue = input.value
    this.nameSignal.set(newValue)
  }
  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement
    console.log(input.value);
  }
  tasksSignal = signal([
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ])
  changeAge(event: Event) {
    const input = event.target as HTMLInputElement
    const newValue = input.value
    this.person.update(prevState => {
      return {
        ...prevState,
        age: parseInt(newValue, 10)
      }
    })
  }
  changeName(event: Event) {
    const input = event.target as HTMLInputElement
    const newValue = input.value
    this.person.update(prevState => {
      return {
        ...prevState,
        name: newValue
      }
    })
  }
}
