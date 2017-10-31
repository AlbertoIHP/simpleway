import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import { AuthenticationService } from './authentication.service'



//Se importan los modelos a utilizar
import { Course } from '../Models/Course.model'

@Injectable()
export class CourseService {

  public base = 'http://localhost:9000/courses/'
  public options: RequestOptions
  public headers: Headers

  constructor(private http: Http, public authService: AuthenticationService)
  {
    this.headers = new Headers(
    {
      'Content-Type': 'application/json'
    })

    this.options = new RequestOptions({ headers: this.headers });


  }

  //GET
  getCourses(): Observable<Course[]>
  {

    var b = new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+this.authService.token } )
    var a = new RequestOptions( { headers: b } )

    return this.http.get( this.base, a ).map((res: Response) => res.json());
  }


  //POST
  registerCourse(course: Course)
  {
    course.access_token = this.authService.token
    var stringCourse = JSON.stringify(course)
    return this.http.post( this.base, stringCourse, this.options).map((res: Response) => res.json());

  }

  //GET
  getCourse(id) : Observable<Course>
  {

    var b = new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+this.authService.token } )
    var a = new RequestOptions( { headers: b } )

    return this.http.get(this.base+id, a ).map((res: Response) => res.json());
  }



  //PUT
  editCourse(course: Course, id)
  {
    course.access_token = this.authService.token
    var stringCourse = JSON.stringify(course)

    return this.http.put(this.base+id, stringCourse, this.options).map((res: Response) => res.json());
  }



  //DELETE
  deleteCourse(id)
  {
    var b = new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+this.authService.token } )
    var a = new RequestOptions( { headers: b } )

    return this.http.delete(this.base+id, a).map((res: Response) => res.json());
  }


}
