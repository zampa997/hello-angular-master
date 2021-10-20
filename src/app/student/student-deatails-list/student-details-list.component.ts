import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DidactisService } from 'src/app/courses/didactis.service';
import { Student } from 'src/app/DTOs/student';

@Component({
    selector: 'app-student-details-list',
    templateUrl: './student-details-list.component.html',
    styleUrls: ['./student-details-list.component.css']
  })
  export class StudentDetailsListComponent implements OnInit{

    student:Student | undefined

    constructor(private service: DidactisService, private router:Router, private route:ActivatedRoute){
    }
    
    ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.service.getStudentById(id)
          .subscribe({
            next: c => {this.student = c},
            error: error => console.log(error)
          });
    }
  }