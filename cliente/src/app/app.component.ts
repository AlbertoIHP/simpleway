import { Component } from '@angular/core'
import { EventService } from './Services/events.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public usuarioLogeado: boolean

  constructor(public eventService: EventService, public router: Router){
    this.usuarioLogeado = true

    if( !(localStorage.getItem('currentUser')) )
    {
      this.usuarioLogeado = false
    }

    this.eventService.isSingIn.subscribe( () => {
      this.usuarioLogeado = true
    })


    this.eventService.isSingOut.subscribe( () => {
      this.usuarioLogeado = false
    })




  }


irIC()
{
  this.router.navigate(['ic']);
}


irMC()
{
  this.router.navigate(['mc']);
}


irAC()
{
  this.router.navigate(['ac']);
}

cerrarSesion()
{
  localStorage.clear()
  this.router.navigate(['/']);
  this.eventService.singOut()
}






}

