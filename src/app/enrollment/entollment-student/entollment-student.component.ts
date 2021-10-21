import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DidactisService } from 'src/app/courses/didactis.service';
import { CourseEdition } from 'src/app/DTOs/edition';
import { Enroll } from 'src/app/DTOs/enroll';
import { Student } from 'src/app/DTOs/student';

@Component({
  selector: 'app-entollment-student',
  templateUrl: './entollment-student.component.html',
  styleUrls: ['./entollment-student.component.css']
})
export class EntollmentStudentComponent implements OnInit {
  editionsSubsribed:Enroll[] = [];
  editionsAllowed:CourseEdition[] = [];
  student:Student;

  constructor(private service: DidactisService, private router:Router, private route:ActivatedRoute){
      this.student = new Student();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getStudentById(id)
    .subscribe({
        next: c => {this.student = c},
        error: error => console.log(error)
    });

    this.service.getSubscribedEnrollmentByStudentId(id)
    .subscribe({
          next: c => {this.editionsSubsribed = c},
          error: error => console.log(error)
        });
    
    this.service.getAvailableEnrollmentByStudentId(id)
    .subscribe({
        next: c => {this.editionsAllowed = c},
        error: error => console.log(error)
    });
  }
  ClickOnEnroll(idEdition:number){
      
      console.log(idEdition);
      console.log(this.editionsAllowed);
      var ed = this.editionsAllowed.find(e => e.id == idEdition)
      if(ed != undefined){
          var enroll = new Enroll(this.student, ed);
          this.service.enrollStudent(enroll)
          .subscribe({
              next: c => enroll = c,
              error: error => console.log(error)
          });

      }
  }
}
