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
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  public totalCourses: Course[]
  public search: any

  constructor(
    public router: Router,
    public courseService: CourseService ) {
    this.totalCourses = []
    this.search = ''

    if( !(localStorage.getItem('currentUser')) )
    {
      this.router.navigate(['/login']);
    }
    else
    {

      this.courseService.getCourses().subscribe(data => {
        this.totalCourses = data
      })


    }
  }

  seeCourse(course)
  {
    localStorage.setItem('currentCourse', JSON.stringify(course))
    this.router.navigate(['vc'])
  }


  searchBy()
  {
    console.log("En desarrollo buscar por "+this.search)
  }


  ngOnInit() {
  }

}
