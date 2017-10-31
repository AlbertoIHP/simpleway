import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MinecoursesComponent } from '../Components/minecourses/minecourses.component'
import { InscribedcoursesComponent } from '../Components/inscribedcourses/inscribedcourses.component'
import { CoursesComponent } from '../Components/courses/courses.component'
import { LoginComponent } from '../Components/login/login.component'

const routes: Routes =
[
  { path: '',  component: LoginComponent },
  { path: 'mc',  component: MinecoursesComponent },
  { path: 'ic',  component: InscribedcoursesComponent },
  { path: 'ac',  component: CoursesComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);

