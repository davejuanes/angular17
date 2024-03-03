import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
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

  person = {
    name: 'Dave Juanes',
    age: 18,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  }
  clickHandler() {
    alert('Hello Dave')
  }

  changeHandler(event: Event) {
    console.log(event);
  }
  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement
    console.log(input.value);
    
  }
}
