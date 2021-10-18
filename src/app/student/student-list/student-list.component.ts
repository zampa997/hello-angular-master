import { Component, TestabilityRegistry } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})



export class StudentListComponent {
  students = [
    {
      id: 1,
      firstname: 'Franco',
      lastname:'Bellavilla',
      email:'francobellavilla@gmail.com'
    },
    {
      id: 2,
      firstname: 'Carla',
      lastname:'Verdi',
      email:'carlaverdi@gmail.com'
    },
    {
      id: 3,
      firstname: 'Gianfrancioschio',
      lastname:'bello',
      email:'Gianfrancioschiobello@gmail.com'
    },
    {
      id: 4,
      firstname: 'Mario',
      lastname:'Rossi',
      email:'mariorossi@gmail.com'
    }
  ];
}

