import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AssesmentsComponent } from './components/assesments/assesments.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { IntroComponent } from './components/intro/intro.component';
import { UsersComponent } from './components/users/users.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminAssessmentComponent } from './components/admin-assessment/admin-assessment.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ViewAssessmentDetailsComponent } from './components/view-assessment-details/view-assessment-details.component';
import { CartComponent } from './components/cart/cart.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddToDashboardDirective } from './directives/add-to-dashboard.directive';
import { CurrencyPipe } from '@angular/common';
import { AttendanceComponent } from './components/attendance/attendance.component';
@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    AssesmentsComponent,
    LoginComponent,
    AdminComponent,
    RegisterComponent,
    ContactUsComponent,
    IntroComponent,
    UsersComponent,
    AddUserComponent,
    UpdateUserComponent,
    NavbarComponent,
    AdminAssessmentComponent,
    QuestionsComponent,
    ViewUserComponent,
    ViewCategoryComponent,
    AddCategoryComponent,
    ViewAssessmentDetailsComponent,
    CartComponent,
    UpdateCategoryComponent,
    DashboardComponent,
    AddToDashboardDirective,
    AttendanceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    CurrencyPipe
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
