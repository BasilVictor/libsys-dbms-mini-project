import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';


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

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['book_isbn', 'borrow'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  goBack(): void {
    this.location.back();
  }

}
