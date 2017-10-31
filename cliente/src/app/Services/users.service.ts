import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import { User } from '../Models/User.model'
import { AuthenticationService } from './authentication.service'

@Injectable()
export class UserService {

  public base = 'http://localhost:9000/users/'
  public options: RequestOptions
  public headers: Headers

  constructor ( private http: Http , public authService: AuthenticationService)
  {
    this.headers = new Headers( { 'Content-Type': 'application/json' } )
    this.options = new RequestOptions( { headers: this.headers } )
  }


  getUsers (): Observable< User[] >
  {

    var b = new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+this.authService.token } )
    var a = new RequestOptions( { headers: b } )

    return this.http.get( this.base, a ).map( ( res: Response ) => res.json() );
  }


  registerUser ( user: User )
  {
    user.access_token = this.authService.token
    var userString = JSON.stringify( user )
    return this.http.post( this.base, userString, this.options).map( ( res: Response ) => res.json() )

  }


  getUser ( id ) : Observable< User >
  {
    var b = new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+this.authService.token } )
    var a = new RequestOptions( { headers: b } )

    return this.http.get( this.base+id, a ).map( ( res: Response ) => res.json() )
  }


  editUser ( user: User, id )
  {
    user.access_token = this.authService.token
    var userString = JSON.stringify( user )

    return this.http.put( this.base+id, userString, this.options ).map( ( res: Response ) => res.json() )
  }


  deleteUser ( id )
  {
    var b = new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+this.authService.token } )
    var a = new RequestOptions( { headers: b } )

    return this.http.delete( this.base+id, a ).map( ( res: Response ) => res.json() )
  }
}
