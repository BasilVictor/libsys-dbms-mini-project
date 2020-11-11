import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Book } from '../shared/book';
import { HttpHeaders } from '@angular/common/http';
import { BooksService } from '../services/books.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  constructor(private location: Location,
    private booksService: BooksService,
    private snackbar: SnackbarService) { }


  book_title: string;
  book_author: string;
  publisher_name: string;
  book_price: string;
  book_isbn: string;

  ngOnInit(): void {
  }

  addBook(): void {
    var accessToken = localStorage.getItem('accessToken');

    var requestOptions = {
      headers: new HttpHeaders({'authorization': 'Bearer ' + accessToken})
    }

    var book = {
      book_isbn: this.book_isbn,
      book_price: this.book_price,
      book_title: this.book_title,
      publisher_name: this.publisher_name,
      book_available: 1,
      book_author: this.book_author
    }

    this.booksService.addBook(requestOptions, book)
    .subscribe(res => {
      this.snackbar.showSnackbar('Book Added Successfully ' + res.message);
      this.book_author = '';
      this.book_isbn = '';
      this.book_price = '';
      this.book_title = '';
      this.publisher_name = '';
    }, err => {
      this.snackbar.showSnackbar('Failed to add Book');
    })

  }

  goBack(): void {
    this.location.back();
  }


}
