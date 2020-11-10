import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { identifierModuleUrl } from '@angular/compiler';

import { Book } from '../shared/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    getBooks(req: any): Observable<any> {
      return this.http.get(baseURL + 'books/', req)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getBook(req: any, id: number): Observable<any> {
      return this.http.get(baseURL + 'books/' + id, req)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
