import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DidactisService } from 'src/app/courses/didactis.service';
import { Course } from 'src/app/DTOs/course';
import { CourseEdition } from 'src/app/DTOs/edition';
import { Teacher } from 'src/app/DTOs/teacher';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-edition-add',
  templateUrl: './edition-add.component.html',
  styleUrls: ['./edition-add.component.css']
})
export class EditionAddComponent implements OnInit {

  editionForm: FormGroup;
  teachers:Teacher[] = [];
  courses:Course[] = [];
  edition: CourseEdition = new CourseEdition();
  id:number = 0;

  faundo = faReply;
  fasave = faSave;

  constructor(private fb:FormBuilder, private editionService: DidactisService, private router:Router, private route:ActivatedRoute) {
    this.editionForm = this.fb.group({   
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id == 0) {
        this.editionForm = this.fb.group({
            code: ['', Validators.required ],
            description: ['', Validators.required ],
            startDate: ['', Validators.required ],
            finalizationDate: ['', Validators.required ],
            realPrice: ['', Validators.required ],
            instructorId: [0, Validators.required ],
            courseId: [this.id, Validators.required ]
          });
    }else{
      this.editionService.getEditionById(this.id)
      .subscribe({
        next: s => {this.edition = s;
            console.log(this.edition.code);
            this.editionForm = this.fb.group({
                id: this.edition.id,
                code: [this.edition.code, Validators.required],
                description: [this.edition.description, Validators.required],
                startDate: [this.edition.startDate, Validators.required],
                finalizationDate: [this.edition.startDate, Validators.required],
                realPrice: [this.edition.realPrice, Validators.required],
                instructorId: [this.edition.instructorId, Validators.required],
                courseId: [this.edition.courseId, Validators.required],
            });
            console.log(this.edition.id);  
        },
        error: err => console.log(err)
      })
      
    }
    this.editionService.getTeachers()
    .subscribe({
      next: t => {this.teachers = t; },
      error: error => console.log(error)
    });
    this.editionService.getCourses()
    .subscribe({
      next: t => {
        this.courses = t;
      },
      error: error => console.log(error)
    });
  }
  save(){
    this.editionForm.value.instructorId = Number(this.editionForm.value.instructorId)
    this.editionForm.value.courseId = Number(this.editionForm.value.courseId)
    if (this.id == 0) {
        this.editionService.createEdition(this.editionForm.value)
        .subscribe({
          next: ce => {
            alert("Edizione creata con id: "+ce.id);
            this.router.navigate([`"/editions/${this.editionForm.value.courseId}"`]);
          },
          error: error=> console.log(error)
        });
    } else {
        this.editionService.updateEdition(this.editionForm.value)
        .subscribe({
          next: ce => {
            alert("Edizione aggiornata con id: "+ce.id);
            this.router.navigate([`"/editions/${this.editionForm.value.courseId}"`]);
          },
          error: error=> console.log(error)
        });
        console.log(this.editionForm.value)
    }
    
  }
  onBack(): void{
    this.router.navigate(["/coursedetails/"+this.id])
  }
  checkValid(name:string):boolean{
    let element = this.editionForm.get(name);
    if(!element)
    {
      return false;
    }

    return (element?.touched || element?.dirty) && !element?.valid
  }
  checkRequired(name:string):boolean{
    let element = this.editionForm.get(name);
    let required = element?.errors?.required;
    return required;
  }
}
