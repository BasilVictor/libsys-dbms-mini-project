import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

import { BooksService } from '../services/books.service';

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
    @Inject('BaseURL') private BaseURL) { }

  dataSource: any;

  displayedColumns: string[] = ['issue_id', 'book_title', 'due_date', 'return'];

  ngOnInit(): void {

    var accessToken = localStorage.getItem('accessToken');

    var requestOptions = {
      headers: new HttpHeaders({'authorization': 'Bearer ' + accessToken})
    }

    this.booksService.getBorrowedBooks(requestOptions)
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    }, err => {
      console.log(err);
    });

  }

  goBack(): void {
    this.location.back();
  }

}
