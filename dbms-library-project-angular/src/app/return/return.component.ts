import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

import { BooksService } from '../services/books.service';
import { SnackbarService } from '../services/snackbar.service';

export interface PeriodicElement {
  issue_id: number;
  due_date: string;
  book_title: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {issue_id: 1, due_date: '2020-10-10', book_title: "Yolo"}
];

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {

  constructor(private location: Location,
    private router: Router,
    private booksService: BooksService,
    private snackbar: SnackbarService,
    @Inject('BaseURL') private BaseURL) { }

  dataSource: any;
  accessToken: string;
  requestOptions: any;

  displayedColumns: string[] = ['issue_id', 'book_title', 'due_date', 'return'];

  ngOnInit(): void {

    this.accessToken = localStorage.getItem('accessToken');

    this.requestOptions = {
      headers: new HttpHeaders({'authorization': 'Bearer ' + this.accessToken})
    }

    this.fetchList();

  }

  fetchList(): void {
    this.booksService.getBorrowedBooks(this.requestOptions)
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    }, err => {
      this.snackbar.showSnackbar('Failed, please login again');
      this.router.navigate(['/login']);
    });
  }

  goBack(): void {
    this.location.back();
  }

  returnBook(id: number): void {
    console.log(id);
    this.booksService.returnBook(this.requestOptions, id)
    .subscribe(res => {
      this.snackbar.showSnackbar('Returned book successfully');
      this.fetchList();
    }, err => {
      this.snackbar.showSnackbar('Failed to return book');
      console.log(err);
    });
  }

}
