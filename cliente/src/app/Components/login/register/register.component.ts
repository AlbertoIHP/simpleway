import { Component, OnInit, Inject } from '@angular/core'
import { User } from '../../../Models/User.model'
import { UserService } from '../../../Services/users.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material'
import { EventService } from '../../../Services/events.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public newUser: User

  constructor(
    public userService: UserService,
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public eventService: EventService) {

    this.newUser = new User()
    console.log(this.newUser)
   }

  ngOnInit() {
  }


  register()
  {
    if ( !(this.newUser.email === "" || this.newUser.name === "" || this.newUser.password === "") )
    {

     this.userService.registerUser( this.newUser ).subscribe( data => {
        console.log(data)
        this.eventService.singUp(this.newUser)
        this.dialogRef.close();
      })
    }

  }

}
