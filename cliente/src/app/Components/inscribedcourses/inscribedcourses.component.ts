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


@Component({
  selector: 'app-inscribedcourses',
  templateUrl: './inscribedcourses.component.html',
  styleUrls: ['./inscribedcourses.component.css']
})
export class InscribedcoursesComponent implements OnInit {
  public totalCourses: Course[]
  public totalInscribed: Inscribe[]
  public currentUser: User

  constructor(
    public router: Router,
    public inscribeService: InscribeService,
    public courseService: CourseService,
    public userService: UserService ) {
    this.totalCourses = []
    this.totalInscribed = []

    if( !(localStorage.getItem('currentUser')) )
    {
      this.router.navigate(['/login']);
    }
    else
    {

      this.currentUser = JSON.parse(localStorage.getItem('currentUser'))


      this.userService.getUsers().subscribe(data => {

        var todo = data

        for( let i = 0 ; i < todo.length ; i ++ )
        {
          if(todo[i].email === this.currentUser.email)
          {
            this.currentUser = todo[i]
            break
          }
        }

      this.inscribeService.getInscribeds().subscribe(data => {
        var tot = data
        this.filterInscribed(tot)

      })



      })




    }
   }


  filterInscribed(tot)
  {

    for( let j = 0 ; j < tot.length ; j ++ )
    {
      if( tot[j].users_id === this.currentUser.id )
      {
        this.totalInscribed.push(tot[j])
      }
    }

    this.filterCourses()

  }

  filterCourses()
  {
    var courses

    this.courseService.getCourses().subscribe(data => {
      courses = data


      for( let j = 0 ; j < this.totalInscribed.length ; j ++)
      {

        for(let i = 0 ; i < courses.length ; i ++ )
        {

          if( courses[i].id === this.totalInscribed[j].course_id )
          {
            this.totalCourses.push(courses[i])
          }

        }

      }



    })
  }

  seeCourse(course)
  {
    localStorage.setItem('currentCourse', JSON.stringify(course))
    this.router.navigate(['vc'])
  }


  ngOnInit() {
  }

}
