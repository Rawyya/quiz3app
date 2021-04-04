import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QuestionFormComponent } from "./question-form/question-form.component";
import { ResultsComponent } from './results/results.component';


import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionsComponent } from './questions/questions.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './service/auth.service';
import { NewQuizComponent } from './new-quiz/new-quiz.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material';

export function tokenGetter() {
  return sessionStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,QuestionFormComponent,ResultsComponent,WelcomeComponent,QuestionsComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    DashboardComponent,
    NavbarComponent,
    NewQuizComponent
  ],
  imports: [
    BrowserModule,MatCardModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    RouterModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
