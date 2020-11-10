import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

import { MatTableDataSource } from '@angular/material/table';

import { BooksService } from '../services/books.service';

export interface PeriodicElement {
  book_title: string;
  book_id: number;
  publisher_name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
    private booksService: BooksService,
    @Inject('BaseURL') private BaseUR) {}

  displayedColumns: string[] = ['book_id', 'book_title', 'publisher_name'];
  dataSource: any;

  ngOnInit(): void {
    var accessToken = localStorage.getItem('accessToken');

    var requestOptions = {
      headers: new HttpHeaders({'authorization': 'Bearer ' + accessToken})
    }

    this.booksService.getBooks(requestOptions)
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    }, err => {
      this.router.navigate(['/login']);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar(message: string) {
    console.log(message);
  }

}
