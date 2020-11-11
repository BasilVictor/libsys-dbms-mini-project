import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

import { FinesService } from '../services/fines.service';
import { SnackbarService } from '../services/snackbar.service';

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

  constructor(private location: Location,
    private router: Router,
    private finesService: FinesService,
    private snackbar: SnackbarService,
    @Inject('BaseURL') private BaseURL) { }


  displayedColumns: string[] = ['fine_id', 'book_title', 'fine_amount'];
  dataSource: any;

  ngOnInit(): void {
    var accessToken = localStorage.getItem('accessToken');

    var requestOptions = {
      headers: new HttpHeaders({'authorization': 'Bearer ' + accessToken})
    }

    this.finesService.getMemberFines(requestOptions)
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    }, err => {
      this.snackbar.showSnackbar('Failed, please login again');
      this.router.navigate(['/login']);
    })
  }

  goBack(): void {
    this.location.back();
  }

}
