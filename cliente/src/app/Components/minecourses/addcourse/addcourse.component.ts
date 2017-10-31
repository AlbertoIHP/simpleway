import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material'
import { EventService } from '../../../Services/events.service'

import { Course } from '../../../Models/Course.model'

import * as moment from 'moment'

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {
  public courseService: any
  public currentUser: any
  public newCourse: Course

  constructor(
    public dialogRef: MatDialogRef<AddcourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public eventService: EventService
    ) {
    this.courseService = data.courseService
    this.currentUser = data.currentUser
    this.newCourse = new Course()
    this.newCourse.users_id = this.currentUser.id
    console.log(this.newCourse)


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
        this.dialogRef.close()
      })
    }
  }
}
