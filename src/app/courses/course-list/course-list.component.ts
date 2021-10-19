import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/DTOs/course';
import { DidactisService } from '../didactis.service';



@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})

export class CourseListComponent implements OnInit {

  public courses:Course[] = [];
  public course:Course = new Course();

  constructor(private service:DidactisService, private router:Router, private route:ActivatedRoute) { console.log('courseListConstructor');
  }


  ngOnInit(): void {
    console.log('ngOnInit CourseListComponent');
    let obsCourses:Observable<Course[]> = this.service.getCourses();
    obsCourses.subscribe({
      next: cs => {
        this.courses = cs;
      },
      error: err => console.log(err)
    });
  }
  clickMethod(id: number) {
    if(window.confirm("Are you sure to delete "+id)) {
      console.log(this.remove(id));
    }
  }
  remove(id: number){
    console.log(id)
    let obsCourse:Observable<Course> = this.service.deleteCourse(id);
    obsCourse.subscribe({
      next: c => {
        this.course = c;
        this.ngOnInit();
      },
      error: err => console.log(err)
    });
  }
/*export class CourseListComponent{
   courses = [
    {
      id: 1,
      title: 'angular for dummies',
      description: 'angular introduction'
    },
    {
      id: 2,
      title: 'react for dummies',
      description: 'react introduction'
    },
    {
      id: 3,
      title: 'vue for dummies',
      description: 'vue introduction'
    },
    {
      id: 4,
      title: 'c# for dummies',
      description: 'c# introduction'
    }
  ];
  singleCourse = {
      id: 5,
      title: 'java for dummies',
      description: 'java introduction'
  }; 
  */
}
