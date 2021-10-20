import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DidactisService } from 'src/app/courses/didactis.service';
import { Student } from 'src/app/DTOs/student';


@Component({
  selector: 'app-root',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})



export class StudentListComponent implements OnInit{
  students:Student[] = []
  
  constructor(private service:DidactisService, private router:Router, private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.service.getStudents()
        .subscribe({
          next: c => {
            this.students = c;
          },
          error: error => console.log(error)
        });
  }
  
}

