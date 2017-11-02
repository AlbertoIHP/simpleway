import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MinecoursesComponent } from '../Components/minecourses/minecourses.component'
import { InscribedcoursesComponent } from '../Components/inscribedcourses/inscribedcourses.component'
import { CoursesComponent } from '../Components/courses/courses.component'
import { LoginComponent } from '../Components/login/login.component'
import { ViewcourseComponent } from '../Components/viewcourse/viewcourse.component'

const routes: Routes =
[
  { path: '',  component: InscribedcoursesComponent },
  { path: 'mc',  component: MinecoursesComponent },
  { path: 'ic',  component: InscribedcoursesComponent },
  { path: 'ac',  component: CoursesComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'vc',  component: ViewcourseComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);

