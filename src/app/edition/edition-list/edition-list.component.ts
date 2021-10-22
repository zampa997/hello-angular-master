import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DidactisService } from 'src/app/courses/didactis.service';
import { CourseEdition } from 'src/app/DTOs/edition';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edition-list',
  templateUrl: './edition-list.component.html',
  styleUrls: ['./edition-list.component.css']
})
export class EditionListComponent implements OnInit {

    public editions:CourseEdition[] = [];
    public edition:CourseEdition = new CourseEdition();
    public originalEditions: CourseEdition[] = [];
    myValue:string="";

    faiscrivi = faGraduationCap;
    fainfo= faInfoCircle;
    faedit = faEdit;
    faelimina = faTrash;
    fasearch = faSearch;

    constructor(private service:DidactisService, private router:Router, private route:ActivatedRoute) {

    }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    let obsCourses:Observable<CourseEdition[]> = this.service.getEditionsByCourseId(id);
    obsCourses.subscribe({
      next: cs => {
        this.editions = cs;   
        console.log(this.editions);
         
        this.originalEditions = cs;
      },
      error: err => console.log(err)
    });
  }

  search(name:string){
    this.editions = this.originalEditions;
    this.editions = this.editions.filter(c => c.code.includes(name))
  }
  delete(id: number) {
    if(window.confirm("Sei sicuro di voler eliminare questo corso?")) {
      console.log(this.remove(id));
    }
  }
  remove(id: number){
      console.log(id)
      let obsCourse:Observable<CourseEdition> = this.service.deleteCourseEdition(id);
      obsCourse.subscribe({
          next: c => {
          this.edition = c;
          this.ngOnInit();
          },
          error: err => console.log(err)
      });
  }
}
