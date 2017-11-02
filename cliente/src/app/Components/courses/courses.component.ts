import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'



@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor( public router: Router ) {
    if( !(localStorage.getItem('currentUser')) )
    {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

}
