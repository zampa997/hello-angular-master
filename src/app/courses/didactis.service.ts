import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Course } from "./course";


@Injectable({
  providedIn: 'root'
})
export class DidactisService {
  private courseUrl = 'https://localhost:44331/api/course';
  //private http:HttpClient;
  constructor(private http: HttpClient){
    this.http = http;
  }
  getCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(this.courseUrl)
            .pipe( tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
            );
  }
  private handleError(errorResponse:HttpErrorResponse) : Observable<never>{ //lancia un'eccezione
    let errorMessage = '';
    if (errorResponse.error instanceof ErrorEvent) {
      errorMessage = 'errore di rete: ' + errorResponse.error.message;
    }else{
      errorMessage = 'errore lato server: ' + errorResponse.status + '' + errorResponse.message;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}


