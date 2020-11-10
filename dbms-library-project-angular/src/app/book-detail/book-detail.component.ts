import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';

import { BooksService } from '../services/books.service';
import { Book } from '../shared/book';

export interface PeriodicElement {
  book_isbn: number;
  borrow: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {book_isbn: 18458451, borrow: 0},
  {book_isbn: 26251561, borrow: 0},
  {book_isbn: 3, borrow: 1},
  {book_isbn: 4, borrow: 1},
  {book_isbn: 5, borrow: 1},
  {book_isbn: 6, borrow: 1},
  {book_isbn: 7, borrow: 1},
  {book_isbn: 8, borrow: 1},
  {book_isbn: 9, borrow: 1},
  {book_isbn: 10, borrow: 1},
];

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
    @Inject('BaseURL') private BaseUR) { }

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
