import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  book_title: string;
  book_id: number;
  book_price: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {book_id: 1, book_title: 'Hydrogen', book_price: 1.0079},
  {book_id: 2, book_title: 'Helium', book_price: 4.0026},
  {book_id: 3, book_title: 'Lithium', book_price: 6.941},
  {book_id: 4, book_title: 'Beryllium', book_price: 9.0122},
  {book_id: 5, book_title: 'Boron', book_price: 10.811},
  {book_id: 6, book_title: 'Carbon', book_price: 12.0107},
  {book_id: 7, book_title: 'Nitrogen', book_price: 14.0067},
  {book_id: 8, book_title: 'Oxygen', book_price: 15.9994},
  {book_id: 9, book_title: 'Fluorine', book_price: 18.9984},
  {book_id: 10, book_title: 'Neon', book_price: 20.1797},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['book_id', 'book_title', 'book_price'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar(message: string) {
    console.log(message);
  }

}
