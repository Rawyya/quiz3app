import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PiLandQuiz';
  isConnected: string;
  constructor(public jwtHelper: JwtHelperService){}
  ngOnInit(){
    const token: string = sessionStorage.getItem('id_token');
    // const loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));

    token != null && !this.jwtHelper.isTokenExpired(token);
    this.isConnected =token
    setInterval(() => {
    this.getIsconnected()
      }, 1000);
  }
  getIsconnected() {
    const token: string = sessionStorage.getItem('id_token');
    // const loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));

    token != null && !this.jwtHelper.isTokenExpired(token);
    this.isConnected =token
  }
}
export class monApplicationComponent {
  cheminImage:any = "assets/logo.png";
}
