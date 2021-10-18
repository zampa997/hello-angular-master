import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../course';
import { DidactisService } from '../didactis.service';

@Component({
    selector: 'app-course-details-list',
    templateUrl: './course-details-list.component.html',
    styleUrls: ['./course-details-list.component.css']
  })
  export class CourseDetailsListComponent implements OnInit {

    course:Course | undefined;

    constructor(private courseService: DidactisService, private router:Router, private route:ActivatedRoute){
    }
    ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (id!=null)
      {
        this.courseService.getCourseById(id)
        .subscribe({
          next: c => this.course = c,
          error: error => console.log(error)
        });
      }      
    }
    onBack(): void{
      this.router.navigate(["/courses"])
    } 
  }