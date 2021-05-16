import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getIdentity(): any {
   return      JSON.parse(sessionStorage.getItem('user'));
  }
  @Output() notifyDelete: EventEmitter<any> = new EventEmitter();
  router: any;
  login(user: any) {
    throw new Error('Method not implemented.');
  }

  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private url = environment.URL

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  register(newUser) {
    return this.http.post(this.url + '/apis/register', newUser, { headers: this.headers });
  }


  authenticate(user) {
    return this.http.post(this.url + '/apis/authenticate', user, { headers: this.headers });
  }
  createQuiz(quiz) {
    return this.http.post(this.url + '/apis/createQuiz', quiz, { headers: this.headers });
  }
  editQuiz(quiz) {

    return this.http.put(this.url + '/apis/editQuiz', quiz, { headers: this.headers });
  }
  getQuiz() {
    return this.http.get(this.url + '/apis/getQuiz', { headers: this.headers });
  }
  deleteQuiz(quizId) {
    return this.http.delete(this.url + '/apis/deletQuiz/'+quizId, { headers: this.headers });
  }


  saveResults(result) {
    return this.http.post(this.url + '/apis/saveResults', result, { headers: this.headers });
  }
  quizDeleted() {
this.notifyDelete.emit('delete')  }
  loggedIn() {
    const token: string = sessionStorage.getItem('id_token');
    // const loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  logOut() {
    sessionStorage.clear()

  }
}
