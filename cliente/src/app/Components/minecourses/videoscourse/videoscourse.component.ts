import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-videoscourse',
  templateUrl: './videoscourse.component.html',
  styleUrls: ['./videoscourse.component.css']
})
export class VideoscourseComponent implements OnInit {
  public currentCourse: any = []
  public totalVideos: any = []


  constructor(public sanitizer: DomSanitizer)
  {
    this.currentCourse = JSON.parse(localStorage.getItem('currentCourse'))
    this.totalVideos = JSON.parse(localStorage.getItem('totalVideos'))
  }

  ngOnInit() {
    console.log("Me he iniciado")
  }

}
