import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FinesService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getMemberFines(req: any): Observable<any> {
    return this.http.get(baseURL + 'fines/members', req)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getAllFines(req: any): Observable<any> {
    return this.http.get(baseURL + 'fines', req)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  payFine(req: any, id: number): Observable<any> {
    return this.http.put(baseURL + 'fines/' + id, {}, req)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
