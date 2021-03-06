import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

import { MatTableDataSource } from '@angular/material/table';

import { BooksService } from '../services/books.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
    private booksService: BooksService,
    private snackbar: SnackbarService,
    @Inject('BaseURL') private BaseURL) {}

  displayedColumns: string[] = ['book_id', 'book_title', 'book_author', 'publisher_name'];
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
      this.snackbar.showSnackbar('Failed, please login again');
      this.router.navigate(['/login']);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
