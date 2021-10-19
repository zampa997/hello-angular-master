import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DidactisService } from 'src/app/courses/didactis.service';
import { Course } from 'src/app/DTOs/course';
import { Teacher } from 'src/app/DTOs/teacher';

@Component({
  selector: 'app-edition-add',
  templateUrl: './edition-add.component.html',
  styleUrls: ['./edition-add.component.css']
})
export class EditionAddComponent implements OnInit {

  editionForm: FormGroup;
  teachers:Teacher[] = [];
  courses:Course[] = [];

  constructor(private fb:FormBuilder, private courseService: DidactisService, private router:Router, private route:ActivatedRoute) {
    this.editionForm = this.fb.group({
      
    });
  }

  ngOnInit(): void {
    this.editionForm = this.fb.group({
      code: ['', Validators.required ],
      description: ['', Validators.required ],
      startDate: ['', Validators.required ],
      realPrice: ['', Validators.required ],
      docenteId: ['', Validators.required ]
    });
    this.courseService.getTeachers()
    .subscribe({
      next: t => {this.teachers = t; console.log(this.teachers)},
      error: error => console.log(error)
    });
    this.courseService.getCourses()
    .subscribe({
      next: t => {this.courses = t; console.log(this.courses)},
      error: error => console.log(error)
    });
  }
  save(){
    console.log(this.editionForm.value)
  }
}
