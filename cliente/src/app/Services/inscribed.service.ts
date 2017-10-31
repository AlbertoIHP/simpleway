import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import { Inscribe } from '../Models/Inscribe.model'
import { AuthenticationService } from './authentication.service'




@Injectable()
export class InscribeService {

  public base = 'http://localhost:9000/inscribeds/'
  public options: RequestOptions
  public headers: Headers

  constructor ( private http: Http , public authService: AuthenticationService)
  {
    this.headers = new Headers( { 'Content-Type': 'application/json' } )
    this.options = new RequestOptions( { headers: this.headers } )
  }


  getInscribeds (): Observable< Inscribe[] >
  {

    var b = new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+this.authService.token } )
    var a = new RequestOptions( { headers: b } )

    return this.http.get( this.base, a ).map( ( res: Response ) => res.json() );
  }


  registerInscribed ( inscribed: Inscribe )
  {
    inscribed.access_token = this.authService.token
    var stringInscribe = JSON.stringify(Inscribe)
    return this.http.post( this.base, stringInscribe, this.options).map( ( res: Response ) => res.json() )

  }


  getInscribed ( id ) : Observable< Inscribe >
  {

    var b = new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+this.authService.token } )
    var a = new RequestOptions( { headers: b } )

    return this.http.get( this.base+id, a ).map( ( res: Response ) => res.json() )
  }


  editInscribed ( inscribed: Inscribe, id )
  {
    inscribed.access_token = this.authService.token
    var stringInscribe = JSON.stringify(Inscribe)

    return this.http.put( this.base+id, stringInscribe, this.options ).map( ( res: Response ) => res.json() )
  }


  deleteInscribed ( id )
  {

    var b = new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+this.authService.token } )
    var a = new RequestOptions( { headers: b } )

    return this.http.delete( this.base+id, a ).map( ( res: Response ) => res.json() )
  }
}
