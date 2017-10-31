import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'


@Injectable()
export class AuthenticationService {

  public token: string;
  public base = 'http://localhost:9000/auth'
  public headers;
  public options;

  constructor(private http: Http)
  {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }


  //Metodo que se encarga de realizar el login a la API
  login(username: string, password: string): Observable<boolean> {

    //Para el inicio de sesion es necesario codificar a 64 bits la contrasena y usuario
    var authorization = 'Basic ' + this.encode(username+':'+password);
    console.log("El authorization es: "+authorization)

    //El tipo de contenido JSON
    var contentType = 'application/json'

    //Utilizamos la llave de aplicacion unica para que solo nosotros podamos entrar (Este Front-End)
    var accessToken = JSON.stringify({access_token: 'sSsxNE0RA62M07hntdYtUPEkU88WjSQg'})

    //En la cabecera se incluye el tipo de contenido JSON, y ademas el usuario y contrasena codificados
    this.headers = new Headers({
          'Content-Type' : contentType,
          'Authorization' : authorization
    })

    //Creamos las opciones de HTTP mediante RequestOptions
    this.options = new RequestOptions({ headers: this.headers })

    //Hacemos la peticion a la API, le entregamos el token con la clave maestra de aplicacion y las opciones configuradas
    return this.http.post( this.base, accessToken, this.options ).map( (response) => {
      return this.verificar(response, username)
    }).catch( e => {
      return this.capturaDeError(e)
    })
  }


  //Metodo de validacion de errores de la API (Codigos HTTP)
  capturaDeError(error)
  {
      if (error.status === 400)
      {
        return Observable.throw('Unauthorized');

      }
  }

  //Metodo que verifica la respuesta de la API
  verificar(response, username)
  {
        if (response.ok)
        {
          let token = response.json() && response.json().token;
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({ email: username, token: token }));
          return true;
        }
        else
        {
          return false;
        }
  }

  logout(): void
  {

    console.log("Borrando token del localstorage y del servicio");
    // clear token remove user from local storage to log user out
    this.token = null;

    localStorage.removeItem('currentUser');

  }



  encode(input)
  {
   var keyStr: any = 'ABCDEFGHIJKLMNOP' +
        'QRSTUVWXYZabcdef' +
        'ghijklmnopqrstuv' +
        'wxyz0123456789+/' +
        '=';
        var output: any = "";
        var chr1: any, chr2: any, chr3: any = "";
        var enc1: any, enc2, enc3: any, enc4: any = "";
        var i: any = 0;

        do {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }

          output = output +
              keyStr.charAt(enc1) +
              keyStr.charAt(enc2) +
              keyStr.charAt(enc3) +
              keyStr.charAt(enc4);
          chr1 = chr2 = chr3 = "";
          enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
  }



}
