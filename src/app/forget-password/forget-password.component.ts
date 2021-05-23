import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  form: FormGroup;
  formcode:FormGroup
  formUdatePassword:FormGroup
  resetting: boolean
  data: any;
  constructor(private fb: FormBuilder,
    private authService: AuthService, private router: Router) { 
      this.form = this.fb.group({
        email: ['', Validators.required]
      });

      this.formUdatePassword= this.fb.group({
        pass1: ['', Validators.required],
        pass2: ['', Validators.required]
      });
      this.formcode = this.fb.group({
        code: ['', Validators.required]
      });
    }

  ngOnInit() {
  }
  login($event) {
    const val = this.form.value;

    if (val.email ) {
      this.authService.checkEmaailExist(val.email)
        .subscribe(
          (resp:any) => {
            this.data =resp
            
         this.resetting =resp.user?true:false
           
          }
        );
    }
  }
  checkcode($event) {
    const val = this.formcode.value;
     val._id =this.data.user._id;
     val.email =this.form.value.email;
    if (val.code ) {
      this.authService.checkResetPasswordCode(val)
        .subscribe(
          (resp:any) => {
          if (resp.success){
            const navigationExtras: NavigationExtras = {state: {data: val}};
            this.router.navigate(['/resetPassword'], navigationExtras);
          }
           
          }
        );
    }
  }



}
