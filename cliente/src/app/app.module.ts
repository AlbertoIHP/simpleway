//Modulos
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './Router/router.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule, MatCardModule, MatGridListModule, MatButtonToggleModule, MatTabsModule, MatInputModule , MatSelectModule, MatDialogModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatMenuModule, MatIconModule } from '@angular/material';
import { MomentModule } from 'angular2-moment';


//Componentes
import { AppComponent } from './app.component';

//Servicios
import { AuthenticationService } from './Services/authentication.service';
import { CourseService } from './Services/courses.service';
import { InscribeService } from './Services/inscribed.service';
import { UserService } from './Services/users.service';
import { VideoService } from './Services/videos.service';
import { EventService } from './Services/events.service';
import { CoursesComponent } from './Components/courses/courses.component';
import { InscribedcoursesComponent } from './Components/inscribedcourses/inscribedcourses.component';
import { MinecoursesComponent } from './Components/minecourses/minecourses.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/login/register/register.component';
import { AddcourseComponent } from './Components/minecourses/addcourse/addcourse.component';
import { EditcourseComponent } from './Components/minecourses/editcourse/editcourse.component';
import { VideoscourseComponent } from './Components/minecourses/videoscourse/videoscourse.component';


@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    InscribedcoursesComponent,
    MinecoursesComponent,
    LoginComponent,
    RegisterComponent,
    AddcourseComponent,
    EditcourseComponent,
    VideoscourseComponent
  ],

    entryComponents:
  [
    RegisterComponent,
    AddcourseComponent,
    EditcourseComponent
  ],

  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatCardModule,
    MomentModule,
    MatStepperModule
  ],
  providers: [
    AuthenticationService,
    CourseService,
    InscribeService,
    UserService,
    VideoService,
    EventService,
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
