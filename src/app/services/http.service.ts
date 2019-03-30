import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class HttpService {
  constructor(private http: HttpClient) {
  }

  private address: string = 'http://localhost:3000/';

  //
  requestPost(url: string, body: any, accessToken?: string) {
    return this.http.post(`${this.address}${url}`, body, {
      headers: this.appendHeaders(accessToken)
    })
  }

  requestGet(url: string, accessToken?: string) {
    return this.http.get(`${this.address}${url}`, {
      headers: this.appendHeaders(accessToken)
    })
      .pipe(catchError(err => this.handelError(err)))
  }

  requestDelete(url: string, accessToken?: string) {
    return this.http.delete(`${this.address}${url}`, {
      headers: this.appendHeaders(accessToken)
    })
      .pipe(catchError(err => this.handelError(err)))
  }

  private handelError(errResponse: HttpErrorResponse): Observable<any> {
    throw errResponse;
  }

  private appendHeaders(accessToken) {
    const headers = {};
    if (accessToken) {
      headers['Authoriaztion'] = `${accessToken}`;
      headers['secret'] = 'members';
    }
    return new HttpHeaders(headers);
  }
}