import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material'
import { EventService } from '../../../Services/events.service'

import { Course } from '../../../Models/Course.model'
import { Video } from '../../../Models/Video.model'

import * as moment from 'moment'

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {
  public courseService: any
  public videoService: any
  public currentUser: any
  public newVideo: any
  public newCourse: Course
  public isLinear = true
  public isFullyCourseInformation = true
  public isFullyVideoInformation = true
  public numberVideos: number[]
  public isAddAllVideos = true
  public videosAdded = 0
  public totalVideos: Video[]



  constructor(
    public dialogRef: MatDialogRef<AddcourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public eventService: EventService
    ) {
    this.numberVideos = []
    this.courseService = data.courseService
    this.currentUser = data.currentUser

    this.newVideo = data.newVideo
    this.videoService = data.videoService
    this.newCourse = new Course()
    this.newCourse.users_id = this.currentUser.id



    }

  ngOnInit() {

  }


  addCourse()
  {
    if( !(this.newCourse.name === "" || this.newCourse.description === "") )
    {
      this.newCourse.date = moment().format('LLLL')
      console.log(this.newCourse)
      this.courseService.registerCourse(this.newCourse).subscribe( data => {
      })


      this.courseService.getCourses().subscribe( data => {
        var total = data

        for ( let i = 0 ; i < total.length ; i++ )
        {
          if(total[i].name === this.newCourse.name)
          {
            this.newCourse = total[i]
            break
          }
        }


        for ( let j = 0 ; j < this.totalVideos.length ; j ++ )
        {

          this.totalVideos[j].course_id = this.newCourse.id
          this.videoService.registerVideo(this.totalVideos[j]).subscribe( data => {
            console.log(data)
          })


        }


        alert("¡Curso creado exitosamente!")
        this.dialogRef.close()


      })



    }
  }

  activeNext()
  {
    if(this.newCourse.name != '' && this.newCourse.description != '' && this.newCourse.totalvids != '')
    {
      this.isFullyCourseInformation = false

      this.numberVideos = []
      this.totalVideos = []

      for ( let i = 1 ; i <= parseInt(this.newCourse.totalvids) ; i ++ )
      {
        this.numberVideos.push(i)
      }
    }
    else
    {
      this.isFullyCourseInformation = true
    }
  }



  activeVideo()
  {
    if(this.newVideo.name != '' && this.newVideo.description != '' && this.newVideo.number != '' && this.newVideo.url != '')
    {
      this.isFullyVideoInformation = false

    }
    else
    {
      this.isFullyVideoInformation = true
    }
  }



  addVideo()
  {
      for ( let j = 0 ; j < this.numberVideos.length ; j++ )
      {
        if(this.numberVideos[j] === this.newVideo.number)
        {
          this.numberVideos.splice(j,1)
          break
        }
      }

       this.totalVideos.push(this.newVideo)
       this.newVideo = new Video()
       this.videosAdded++

       if(this.videosAdded === parseInt(this.newCourse.totalvids) )
       {
        localStorage.setItem('totalVideos', JSON.stringify(this.totalVideos))
        localStorage.setItem('currentCourse', JSON.stringify(this.newCourse))
        this.isFullyVideoInformation = true
        this.isAddAllVideos = false
       }

  }
}
