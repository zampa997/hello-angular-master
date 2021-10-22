import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DidactisService } from 'src/app/courses/didactis.service';
import { Student } from 'src/app/DTOs/student';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-root',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})



export class StudentListComponent implements OnInit{

  
  students:Student[] = []
  student:Student = new Student();
  originalStudents:Student[] = [];
  myValue:string="";

  

  fasearch = faSearch;
  fainfo = faInfoCircle;
  faedit = faEdit;
  fatrash = faTrash;
  fauser = faUser;
  faplus = faGraduationCap;
  
  constructor(private service:DidactisService, private router:Router, private route:ActivatedRoute) {
  }
  ngOnInit(): void {

    this.service.getStudents()
        .subscribe({
          next: c => {
            this.students = c
            this.originalStudents = c;
          },
          error: error => console.log(error)
        });
  }
  search(name:string){

    this.students = this.originalStudents;
    this.students = this.students.filter(c => c.surname.includes(name))

  }

  delete(id: number) {
    if(window.confirm("Are you sure to delete "+id)) {
      console.log(this.remove(id));
    }
  }
  
  remove(id: number){
    console.log(id)
    let obsCourse:Observable<Student> = this.service.deleteStudent(id);
    obsCourse.subscribe({
      next: c => {
        this.student = c;
        this.ngOnInit();
      },
      error: err => console.log(err)
    });
  }
  
}

