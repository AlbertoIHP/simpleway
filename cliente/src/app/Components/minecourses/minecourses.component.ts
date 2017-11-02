import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core'
import { Router } from '@angular/router'
import { CourseService } from '../../Services/courses.service'
import { InscribeService } from '../../Services/inscribed.service'
import { UserService } from '../../Services/users.service'
import { VideoService } from '../../Services/videos.service'
import { EventService } from '../../Services/events.service'

import { Video } from '../../Models/Video.model'
import { Course } from '../../Models/Course.model'
import { User } from '../../Models/User.model'
import { Inscribe } from '../../Models/Inscribe.model'

import {DataSource} from '@angular/cdk/collections'
import {MatPaginator} from '@angular/material'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/observable/fromEvent'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material'


import { ExampleDatabase, dataTable, buscadorPorNombre } from '../constants/constants'



import { AddcourseComponent } from './addcourse/addcourse.component'

@Component({
  selector: 'app-minecourses',
  templateUrl: './minecourses.component.html',
  styleUrls: ['./minecourses.component.css']
})
export class MinecoursesComponent implements OnInit {
  displayedColumns = [
  'Acciones',
  'Nombre',
  'Fecha de Creacion',
  'Descripcion',
  'Videos'
  ];

  //DATATABLE
  public exampleDatabase
  public dataSource: dataTable | null
  public dataSource2: buscadorPorNombre | null
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild('filter') filter: ElementRef
  public searchByName: boolean


  public totalVideos: Video[]
  public totalCourses: Course[]
  public totalUsers: User[]
  public totalInscribed: Inscribe[]
  public currentUser: any

  public mineCourses: Course[]
  public newVideo: Video

  constructor(
    public router: Router,
    public videoService: VideoService,
    public courseService: CourseService,
    public userService: UserService,
    public inscribeService: InscribeService,
    public dialog: MatDialog ) {

    if( !(this.currentUser = JSON.parse(localStorage.getItem('currentUser')) ))
    {
      this.router.navigate(['/login'])
    }
    else
    {
     this.newVideo = new Video()
     this.totalVideos = []
     this.totalCourses = []
     this.totalUsers = []
     this.totalInscribed = []
     this.mineCourses = []
     this.searchByName = false
     this.getVideos()
    }


  }

  ngOnInit() {
  }

  getVideos()
  {
    this.videoService.getVideos().subscribe( data => {
      this.totalVideos = data
      this.getCourses()

    })
  }

  getCourses()
  {
    this.courseService.getCourses().subscribe( data => {
      this.totalCourses = data
      this.getUsers()
    })
  }

  getUsers()
  {
    this.userService.getUsers().subscribe( data => {
      this.totalUsers = data
      this.getInscribed()
    })
  }

  getInscribed()
  {
    this.inscribeService.getInscribeds().subscribe( data => {
      this.totalInscribed = data
      this.filterUser()
    })
  }

  filterUser()
  {
    for( let i = 0 ; i < this.totalUsers.length ; i ++)
    {
      if(this.currentUser.email === this.totalUsers[i].email)
      {
        this.currentUser = this.totalUsers[i]
        this.filterCourses()
        break
      }
    }
  }

  filterCourses()
  {
    this.mineCourses = []
    for( let i = 0 ; i < this.totalCourses.length ; i ++)
    {
      if( this.totalCourses[i].users_id === this.currentUser.id)
      {
        this.mineCourses.push(this.totalCourses[i])
      }
    }
    console.log(this.mineCourses)
    this.asignDatatable()
  }


  asignDatatable()
  {
      this.exampleDatabase = new ExampleDatabase(this.mineCourses );
      this.dataSource = new dataTable(this.exampleDatabase, this.paginator);
      this.dataSource2 = new buscadorPorNombre(this.exampleDatabase, 'Course');

      Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource2) { return; }
          this.dataSource2.filter = this.filter.nativeElement.value;
        });
  }

  editCourse(course)
  {


  }

  deleteCourse(course)
  {
    this.courseService.deleteCourse(course.id).subscribe(data => {

      localStorage.removeItem('currentCourse');
      this.getVideos()
    })
  }


  createCourse()
  {
    let dialogRef = this.dialog.open(AddcourseComponent, {
      width: '1000px',
      data: {
        courseService: this.courseService,
        currentUser: this.currentUser,
        newVideo: this.newVideo,
        videoService: this.videoService
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getVideos()
    });
  }


  changeSearch()
  {
    this.searchByName = !this.searchByName
  }

  viewCourse(course)
  {
    localStorage.setItem('currentCourse', JSON.stringify(course))
    this.router.navigate(['vc'])
  }


}
