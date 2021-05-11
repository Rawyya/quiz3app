import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../service/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  private _router: any;
  identity: any;
  auth: any;

  studentNabar: any = [
    { title: "home", link: "home" },
    { title: "tutoriel", link: "tutoriel" },
    { title: "profile", link: "profile" },
    { title: "about us", link: "about-us" },
  ];
  teacherNabar: any = [
    { title: "Dashbord", link: "dashbord" },
    { title: "Create Quiz", link: "newquiz" },
  ];
  menu: any;
  home: string;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.identity = this.authService.getIdentity();
    if (this.identity.role == "student") {
      this.menu = this.studentNabar;
      this.home ='home'
    } else {
      this.home ='dashboard'
      this.menu = this.teacherNabar;
    }
    //  localStorage.clear();
  }
  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl("/login");
    //console.log("clicked");
  }
}
