import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';


import { switchMap } from 'rxjs/operators';

import { QuestionsService } from '../questions.service';
import { Quiz, Answers, Choice, Question } from '../quiz.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  quiz: Quiz;
  answers: Answers;
  questions: Question[];
  currentQuestionIndex: number;

  showResults = false;
  state: any
  example: any;
  
  constructor(private router: Router,private route: ActivatedRoute, public questionsService: QuestionsService){
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {data: any};
    this.quiz = state.data;
    function check(a ,b){
      return a==b?true:false

    }
    this.questions=this.quiz.questions.map((r:any)=>
     new Question(r.que,
      [
        {value:r.option1,correct:check(r.option1,r[r.correctOption])},
        {value:r.option2,correct:check(r.option2,r[r.correctOption])},
        {value:r.option3,correct:check(r.option3,r[r.correctOption])},
        {value:r.option4,correct:check(r.option4,r[r.correctOption])},
      ]))
    
  }

  ngOnInit() {
    this.currentQuestionIndex = 0;
    this.answers = new Answers();
  
  }

  updateChoice(choice: Choice){
    this.answers.values[this.currentQuestionIndex] = choice;
  }

  nextOrViewResults(){
    if (this.currentQuestionIndex === this.questions.length - 1){
      this.showResults = true;
      return;
    }

    this.currentQuestionIndex++;
  }

  reset(){
    this.quiz = undefined;
    this.questions = undefined;
    this.answers = undefined;
    this.currentQuestionIndex = undefined;
  }

}
