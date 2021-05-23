import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../service/auth.service";

@Component({
  selector: "app-update-password",
  templateUrl: "./update-password.component.html",
  styleUrls: ["./update-password.component.css"],
})
export class UpdatePasswordComponent implements OnInit {
  form: FormGroup;
  data: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as { data: any };
    this.data = state.data;
    this.form = this.fb.group({
      pass1: ["", Validators.required],
      pass2: ["", Validators.required],
    });
  }

  reset() {
    let val = this.form.value;
    val.email = this.data.email;
    val._id = this.data._id;
    if (val.pass1 && val.pass2 && val.pass1 == val.pass2) {
      this.authService.updatePassword(val).subscribe((resp) => {
        this.router.navigate(['/login'])
      });
    }
  }

  ngOnInit() {}
}
