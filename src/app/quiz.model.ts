// src/app/quiz.model.ts

export class Choice {
  constructor(public value: string, public correct?: boolean) {}
}

export class Question {
  constructor(public label: string, public choices: Choice[]) {}
}

export class Quiz {
  constructor(public subject: string, public title: string, public time: any,public totalMarks: any, public questions: any){}
}

export class Answers {
  constructor(public values: Choice[] = []) {}
}
