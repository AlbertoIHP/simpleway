import { Component, OnInit } from '@angular/core';
import { EventService } from '../../Services/events.service'
import { Router } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service'
import { RegisterComponent } from './register/register.component'

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ElementRef, ViewChild, Inject } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: string
  public password: string

  constructor( public dialog: MatDialog, public eventService: EventService, private router: Router, public authService: AuthenticationService) {
    this.user = ''
    this.password = ''
    this.eventService.isSingUp.subscribe( (newUser) => {
      this.user =  newUser.email
      this.password = newUser.password
    })
  }

  ngOnInit() {
  }


  login()
  {
    if( !( this.user === "" || this.password === "" ) )
    {
      this.authService.login(this.user, this.password).subscribe( ( data ) => {
        this.eventService.singIn()
        this.router.navigate(['ic'])
      },

      (err) => {

        if ( err === 'Unauthorized' )
        {
          alert("No estas registrado")
        }

      })
    }

  }


  register()
  {
    let dialogRef = this.dialog.open(RegisterComponent, {
      width: '500px',
      data: {

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("cerrando")
    });
  }

}
