import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { QuestionsService } from '../questions.service';
import { Quiz } from '../quiz.model'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  quiz: Quiz[];

  constructor(public questionsService: QuestionsService,private router: Router) {}

  ngOnInit() {

    this.questionsService.getQuizzes()
      .subscribe(quiz => {
        this.quiz= quiz
      })
  }

  reset(){
    this.quiz=undefined
  }
  goto(quiz:any){
    const navigationExtras: NavigationExtras = {state: {data: quiz}};
    this.router.navigate(['/quizzing'], navigationExtras);
  }
}