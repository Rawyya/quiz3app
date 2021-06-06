import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: "app-edit-quiz",
  templateUrl: "./edit-quiz.component.html",
  styleUrls: ["./edit-quiz.component.css"],
})
export class EditQuizComponent implements OnInit {
  form: FormGroup;
  quiz: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ["", Validators.required],
      totalMarks: ["", Validators.required],
      time: ["", Validators.required],
      subject: ["", Validators.required],
      _id: ["", Validators.required],
      questions: this.fb.array([]),
    });

    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {data: any};
    this.quiz = state.data;
   
    if (this.quiz.questions.length>0){
      this.quiz.questions.forEach(element => {
        this.addQuestion()
      });
    

    }
    this.form.controls['title'].setValue(this.quiz.title);
    this.form.controls['totalMarks'].setValue(this.quiz.totalMarks);
    this.form.controls['time'].setValue(this.quiz.time);
    this.form.controls['questions'].setValue(this.quiz.questions);
    this.form.controls['subject'].setValue(this.quiz.subject);
    this.form.controls['_id'].setValue(this.quiz._id);
  }
  init() {
    return this.fb.group({
      mark: ["", Validators.required],
      _id: ["", Validators.required],
      que: ["", Validators.required],
      option1: ["", Validators.required],
      option2: ["", Validators.required],
      option3: ["", Validators.required],
      option4: ["", Validators.required],
      correctOption: ["", Validators.required],
    });
  }

  addQuestion() {
    const control = <FormArray>this.form.get("questions");
    control.push(this.init());
  }

  removeQuestion(i) {
    const control = <FormArray>this.form.get("questions");
    if (control.length > 1) {
      control.removeAt(i);
    }
  }

  save() {
    if (this.form.valid) {
      this.authService.editQuiz(this.form.value).subscribe((resp) => {
        console.log(resp);

        if (resp["success"] === true) {
          this.form.reset();

        } else {
          console.log("error");
        }
      });
      setTimeout(()=>{
         this.router.navigateByUrl("/dashboard");
    }, 3000);

    }
  }

  cancel() {
    this.router.navigateByUrl("/dashboard");
  }

  ngOnInit() {
    console.log(this.form);
  }
}