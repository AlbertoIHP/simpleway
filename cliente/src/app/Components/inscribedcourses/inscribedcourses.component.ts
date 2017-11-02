import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'




@Component({
  selector: 'app-inscribedcourses',
  templateUrl: './inscribedcourses.component.html',
  styleUrls: ['./inscribedcourses.component.css']
})
export class InscribedcoursesComponent implements OnInit {

  constructor( public router: Router ) {
    if( !(localStorage.getItem('currentUser')) )
    {
      this.router.navigate(['/login']);
    }
   }

  ngOnInit() {
  }

}
