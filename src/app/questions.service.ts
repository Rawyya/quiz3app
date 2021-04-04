// src/app/questions.service.ts
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Quiz, Question } from './quiz.model';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class QuestionsService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private url = environment.URL
  constructor(private http: HttpClient) {}

  public getQuizzes() {
    return this.http.get(this.url + '/apis/getQuiz', { headers: this.headers }).pipe(
      map((result: any) => {
        return result.msg.map( (r:any)=> new Quiz(r.subject, r.title, r.totalMarks, r.mark,r.questions));
      })
    );
  }

  public getQuestions(fileName: string) {
    return this.http.get(`./assets/${fileName}.json`).pipe(
      map((result: any[]) => {
        return result.map(r => new Question(r.label, r.choices));
      })
    );
  }
}