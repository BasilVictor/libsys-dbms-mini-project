import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  signIn(user: any): Observable<any> {
    return this.http.post<any>(baseURL + 'auth/login', {'memb_id': user.memb_id})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
