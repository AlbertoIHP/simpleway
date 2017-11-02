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


import { DomSanitizer } from '@angular/platform-browser'
import * as moment from 'moment'


@Component({
  selector: 'app-viewcourse',
  templateUrl: './viewcourse.component.html',
  styleUrls: ['./viewcourse.component.css']
})
export class ViewcourseComponent implements OnInit {

  public currentCourse: Course
  public currentUser: User
  public authorCourse: User
  public currentVideo: Video
  public courseVideos: Video[]
  public isInscribed: boolean
  public totalInscribed: Inscribe[]
  public newInscribe: Inscribe

  constructor(
    public sanitizer: DomSanitizer,
    public userService: UserService,
    public videoService: VideoService,
    public inscribeService: InscribeService,
    public router: Router)
  {

    if(localStorage.getItem('currentCourse') && localStorage.getItem('currentUser'))
    {
      this.newInscribe = new Inscribe()
      this.totalInscribed = []
      this.isInscribed = false
      this.authorCourse = new User()
      this.currentVideo = new Video()
      this.courseVideos = []
      this.currentCourse = JSON.parse(localStorage.getItem('currentCourse'))
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'))


      this.userService.getUser(this.currentCourse.users_id).subscribe( data => {
        this.authorCourse = data

        this.userService.getUsers().subscribe(data => {
          var todo = data

          for( let j = 0 ; j < todo.length ; j ++)
          {
            if(todo[j].email === this.currentUser.email)
            {
              this.currentUser = todo[j]
              break
            }
          }

        this.getVideos()


        })


      })


    }
    else
    {
      this.router.navigate(['mc'])
    }




  }

  getInscribed()
  {
    this.inscribeService.getInscribeds().subscribe(data => {
      var tot = data
      this.filterInscribed(tot)
    })
  }


  filterInscribed(totalInscribed)
  {
    this.totalInscribed = []
    for ( let i = 0 ; i < totalInscribed.length ; i ++ )
    {
      if( totalInscribed[i].users_id === this.currentUser.id && totalInscribed[i].course_id === this.currentCourse.id )
      {
        this.isInscribed = true
      }

      if(totalInscribed[i].course_id === this.currentCourse.id)
      {
        this.totalInscribed.push(totalInscribed[i])
      }
    }
  }

  getVideos()
  {
    this.videoService.getVideos().subscribe(data => {
      var totalVids= data
      this.filterVideos(totalVids)
      this.getInscribed()
    })
  }

  filterVideos(totalVideos)
  {
    this.courseVideos = []
    for( let i = 0 ; i < totalVideos.length ;  i++ )
    {
      console.log("ID de curso del video "+totalVideos[i].course_id)
      console.log("ID del curso "+this.currentCourse.id )
      if(totalVideos[i].course_id === this.currentCourse.id )
      {
        this.courseVideos.push(totalVideos[i])
      }
    }

    this.currentVideo = this.courseVideos[0]
  }


  changeVideo(video)
  {
    this.currentVideo = video
  }


  inscribeCourse()
  {
    this.newInscribe.users_id = this.currentUser.id
    this.newInscribe.course_id = this.currentCourse.id
    this.newInscribe.date = moment().format('LLLL')
    this.newInscribe.completed = 'No esta completado'

    console.log(this.newInscribe)
    this.inscribeService.registerInscribed(this.newInscribe).subscribe( data => {
      this.isInscribed = true
      this.getVideos()

    })


  }


  uninscribeCourse()
  {

    this.inscribeService.getInscribeds().subscribe( data => {
      var tot = data
      var toDelete: Inscribe = new Inscribe()

      for( let j = 0 ; j < tot.length ; j ++ )
      {
        if(tot[j].course_id === this.currentCourse.id && tot[j].users_id === this.currentUser.id)
        {
          toDelete = tot[j]
          break
        }
      }


      this.inscribeService.deleteInscribed(toDelete.id).subscribe( data => {
        this.isInscribed = false
        this.getVideos()
      })


    })

  }

  ngOnInit() {
  }

}
