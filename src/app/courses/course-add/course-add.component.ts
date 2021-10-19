import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/DTOs/area';
import { Level } from 'src/app/DTOs/level';
import { Course } from '../course';
import { DidactisService } from '../didactis.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

  course:Course;
  areas:Area[] = [];
  levels: {value : number, label:string}[];
  constructor(private service:DidactisService, private router:Router, private route:ActivatedRoute) { 
    this.levels = this.getLevels();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.course = new Course();
    this.course.level = Level.BEGINNER;
    if (id != 0)
    {
      this.service.getCourseById(id)
                  .subscribe({
                    next: c => this.course = c,
                    error: err => console.log(err)
                  })
      //this.course.level = Number(this.course.level);
      console.log(this.course.level)    
    }
  }

  ngOnInit(): void {
    this.service.getAreas()
                .subscribe({
                  next: as => this.areas = as,
                  error: err => console.log(err)
                })
  }

  getLevels() :{value : number, label:string}[] {
    let enumArray = Object.keys(Level)
                          .filter( x => !Number.isNaN(Number(x)))
                          .map( x => {
                            return { value: Number(x), label: Level[Number(x)] };
                          });
    console.log(enumArray);
    return enumArray;
  }
  save(form:NgForm){
    console.log(form.value);
    this.course.level = form.value
    this.service.createCourse(this.course)
        .subscribe({
          next: cs => {
            this.course = cs;
            alert("corso creato con id: "+this.course.id);
            this.router.navigate(["/courses"])
          },
          error: err => console.log(err)
        });
  }
}
