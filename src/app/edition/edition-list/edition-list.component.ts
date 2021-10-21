import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DidactisService } from 'src/app/courses/didactis.service';
import { CourseEdition } from 'src/app/DTOs/edition';

@Component({
  selector: 'app-edition-list',
  templateUrl: './edition-list.component.html',
  styleUrls: ['./edition-list.component.css']
})
export class EditionListComponent implements OnInit {

    public editions:CourseEdition[] = [];
    public edition:CourseEdition = new CourseEdition();

    constructor(private service:DidactisService, private router:Router, private route:ActivatedRoute) {
         console.log('courseListConstructor');
    }

  ngOnInit(): void {
    console.log('ngOnInit EditionListComponent');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    let obsCourses:Observable<CourseEdition[]> = this.service.getEditionsByCourseId(id);
    obsCourses.subscribe({
      next: cs => {
        this.editions = cs;
      },
      error: err => console.log(err)
    });
  }

}
