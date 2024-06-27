import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomeComponent } from './components/home/home.component';
import { AssesmentsComponent } from './components/assesments/assesments.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { IntroComponent } from './components/intro/intro.component';
import { AdminGuard } from './Guards/admin_guard';
import { ViewAssessmentDetailsComponent } from './components/view-assessment-details/view-assessment-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuestionsComponent } from './components/questions/questions.component';
const routes: Routes = [
  {path:"aboutus",component:AboutUsComponent},
  {path:"home",component:HomeComponent},
  {path:"assessments",component:AssesmentsComponent},
  {path:"login",component:LoginComponent,},
  {path:"admin",component:AdminComponent, canActivate:[AdminGuard()]},
  {path:"register",component:RegisterComponent},
  {path:"contactus",component:ContactUsComponent},
  {path:"intro",component:IntroComponent},
  {path:"viewassessmentdetails/:id",component:ViewAssessmentDetailsComponent},
  {path:"dashBoard",component:DashboardComponent},
  {path:"assessmentQuestions/:id",component:QuestionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
