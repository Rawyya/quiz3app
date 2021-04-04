import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NewQuizComponent } from './new-quiz/new-quiz.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  // { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'newquiz', component: NewQuizComponent  },
  // { path: '**', redirectTo: 'home' }
  { path: 'welcome', component: WelcomeComponent },
  { path: 'quizzing', component: QuestionsComponent },
  { path: 'd', redirectTo: "welcome", pathMatch: "prefix" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
