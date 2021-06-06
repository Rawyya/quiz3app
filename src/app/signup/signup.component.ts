import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  message: string


  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

      type: ['', Validators.required],
    });
  }

  login() {
    const val = this.form.value;

    if (val.email && val.password && val.type) {

      this.authService.userExist(val).subscribe((userinfo:any)=>{
        if (!userinfo.msg){
        this.authService.register(val)
        .subscribe(
          ( ) => {

            this.authService.authenticate(val).subscribe(
                (resp ) => {
                  sessionStorage.setItem("id_token", resp["token"]);
                  sessionStorage.setItem("user", JSON.stringify(resp["user"]));
                  this.router.navigateByUrl('/quizzes').then(() => {
                    window.location.reload();
                  });
                })


          }
        );
        }else{
          this.message ='user exist try another email'
        }
      })
      
    }
  }

  ngOnInit() {
  }

}
