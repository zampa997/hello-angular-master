import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';

@Component({
    selector: 'app-student-details-list',
    templateUrl: './student-details-list.component.html',
    styleUrls: ['./student-details-list.component.css']
  })
  export class StudentDetailsListComponent{
    singleStudent = {
        id: 5,
        firstName: 'Marco',
        lastName: 'Rossi',
        email: 'email@mail.com',
        phoneNumber: '32532562546',
        birthDate: '12/10/1998'
    }; 
  }