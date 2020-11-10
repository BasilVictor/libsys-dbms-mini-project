import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

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

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['issue_id', 'book_title', 'due_date', 'return'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  goBack(): void {
    this.location.back();
  }

}
