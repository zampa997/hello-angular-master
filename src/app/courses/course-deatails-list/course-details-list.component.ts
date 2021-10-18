import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-course-details-list',
    templateUrl: './course-details-list.component.html',
    styleUrls: ['./course-details-list.component.css']
  })
  export class CourseDetailsListComponent{
    singleCourse = {
        id: 5,
        title: 'java for dummies',
        description: 'java introduction',
        duration: 200,
        basePrice: 300,
        grantsCertification: true
    }; 
  }