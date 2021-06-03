import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NewQuizComponent } from './new-quiz/new-quiz.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionsComponent } from './questions/questions.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent} from './profile/profile.component';
import { TutorielComponent } from './tutoriel/tutoriel.component';
import { EditQuizComponent } from './dashboard/edit-quiz/edit-quiz.component';
import { DashboardingComponent } from './dashboarding/dashboarding.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

   { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
  { path: 'quizzes', component: DashboardComponent ,canActivate:[AuthGuard]},
  { path: 'dashboard', component: DashboardingComponent,canActivate:[AuthGuard] },
  { path: 'newquiz', component: NewQuizComponent  },
  // { path: '**', redirectTo: 'home' }
  { path: 'welcome', component: WelcomeComponent ,canActivate:[AuthGuard]},
  { path: 'editQuiz', component: EditQuizComponent },
  { path: 'quizzing', component: QuestionsComponent },
  { path: 'd', redirectTo: "welcome", pathMatch: "prefix" },
  { path: 'about-us' , component : AboutUsComponent },
  {path : 'logout' , component : LogoutComponent},
  {path : 'profile' , component : ProfileComponent},
  {path : 'tutoriel' , component : TutorielComponent},

  {path : 'forgetPassword' , component : ForgetPasswordComponent},
  {path : 'resetPassword' , component : UpdatePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
