import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  fine_id: number;
  fine_amount: number;
  book_title: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {fine_id: 1, fine_amount: 100.00, book_title: "Yolo"}
];

@Component({
  selector: 'app-fines',
  templateUrl: './fines.component.html',
  styleUrls: ['./fines.component.scss']
})
export class FinesComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['fine_id', 'book_title', 'fine_amount'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  goBack(): void {
    this.location.back();
  }

}
