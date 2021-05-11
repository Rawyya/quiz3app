import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QuestionFormComponent } from "./question-form/question-form.component";
import { ResultsComponent } from './results/results.component';
import {FormsModule }from '@angular/forms';
import{ReactiveFormsModule} from '@angular/forms';
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
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './service/auth.service';
import { NewQuizComponent } from './new-quiz/new-quiz.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TutorielComponent} from './tutoriel/tutoriel.component';

import {
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,

  MatToolbarModule
} from '@angular/material';
import { AboutUsComponent } from './about-us/about-us.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfirmationDialogComponent } from './dashboard/confirmation-dialog/confirmation-dialog.component';
import { DialogService } from './dashboard/confirmation-dialog/dialog.service';
import { EditQuizComponent } from './dashboard/edit-quiz/edit-quiz.component';
import { DefaultComponent } from './layouts/default/default.component';
import { DashbComponent } from './modules/dashb/dashb.component';


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
    NewQuizComponent,
    AboutUsComponent,
    LogoutComponent,
    ProfileComponent,
    TutorielComponent,
    ConfirmationDialogComponent,
    EditQuizComponent,
    DefaultComponent,
    DashbComponent

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
    MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatCardModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatToolbarModule,
        MatSidenavModule,
        MatDividerModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [AuthService,DialogService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationDialogComponent,
  ]
})
export class AppModule { }
