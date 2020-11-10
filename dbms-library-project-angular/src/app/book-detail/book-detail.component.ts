import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';

import { BooksService } from '../services/books.service';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  constructor(private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private booksService: BooksService,
    @Inject('BaseURL') private BaseURL) { }

  data: Book[];
  dataSource: any;
  displayedColumns: string[] = ['book_isbn', 'book_available'];

  ngOnInit(): void {
    var accessToken = localStorage.getItem('accessToken');

    var requestOptions = {
      headers: new HttpHeaders({'authorization': 'Bearer ' + accessToken})
    }

    this.route.params.pipe(switchMap((params: Params) => { 
      return this.booksService.getBook(requestOptions, params['book_id']);
    }))
    .subscribe(res => {
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      console.log(res);
    }, err => {
      console.log(err);
    });

  }

  
  

  goBack(): void {
    this.location.back();
  }

}
