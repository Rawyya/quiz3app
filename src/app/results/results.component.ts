// src/app/results/results.component.ts
// import { Component, OnInit } from '@angular/core';
import { Component, Input, OnInit } from "@angular/core";
import { Answers } from "../quiz.model";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
})
export class ResultsComponent implements OnInit {
  @Input() answers: any;
  @Input() quiz: any;
  score: number =0;

  ngOnInit() {

    for (let index = 0; index <  this.quiz.questions.length; index++) {
      this.answers.values[index].question= this.quiz.questions[index].que
      this.answers.values[index].mark= this.score+this.quiz.questions[index].mark
      this.answers.values[index].QuestionScore =0
      if (this.answers.values[index].correct){
        this.answers.values[index].QuestionScore =this.score+this.quiz.questions[index].mark
        this.score =  this.score+this.quiz.questions[index].mark
      }
    }
  }

}
