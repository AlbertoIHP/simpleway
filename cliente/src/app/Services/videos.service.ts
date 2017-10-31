import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import { Video } from '../Models/Video.model'
import { AuthenticationService } from './authentication.service'



@Injectable()
export class VideoService {

  public base = 'http://localhost:9000/videos/'
  public options: RequestOptions
  public headers: Headers

  constructor ( private http: Http, public authService: AuthenticationService )
  {
    this.headers = new Headers( { 'Content-Type': 'application/json' } )
    this.options = new RequestOptions( { headers: this.headers } )
  }


  getVideos (): Observable< Video[] >
  {
    var b = new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+this.authService.token } )
    var a = new RequestOptions( { headers: b } )

    return this.http.get( this.base, a).map( ( res: Response ) => res.json() );
  }


  registerVideo ( video: Video )
  {
    video.access_token = this.authService.token
    var stringVideo = JSON.stringify( video )
    return this.http.post( this.base, stringVideo, this.options).map( ( res: Response ) => res.json() )

  }


  getVideo ( id ) : Observable< Video >
  {
    var b = new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+this.authService.token } )
    var a = new RequestOptions( { headers: b } )

    return this.http.get( this.base+id, a ).map( ( res: Response ) => res.json() )
  }


  editVideo ( video: Video, id )
  {
    video.access_token = this.authService.token
    var stringVideo = JSON.stringify( video )

    return this.http.put( this.base+id, stringVideo, this.options ).map( ( res: Response ) => res.json() )
  }


  deleteVideo ( id )
  {
    var b = new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+this.authService.token } )
    var a = new RequestOptions( { headers: b } )

    return this.http.delete( this.base+id, a ).map( ( res: Response ) => res.json() )
  }
}
