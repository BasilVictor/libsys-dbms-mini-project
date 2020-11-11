import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { FinesService } from '../services/fines.service';

import { MatTableDataSource } from '@angular/material/table';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private router: Router,
    private finesService: FinesService,
    private _snackBar: MatSnackBar,
    @Inject('BaseURL') private BaseURL) { }

  displayedColumns: string[] = ['fine_id', 'memb_id', 'book_title', 'fine_amount', 'pay_fine'];
  dataSource: any;
  accessToken: string;
  requestOptions: any;

  ngOnInit(): void {

    this.accessToken = localStorage.getItem('accessToken');

    this.requestOptions = {
      headers: new HttpHeaders({'authorization': 'Bearer ' + this.accessToken})
    }

    this.initFetch();

  }

  initFetch(): void {
    this.finesService.getAllFines(this.requestOptions)
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    }, err => {
      console.log(err);
      this._snackBar.open('Un-Authorized', '', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.router.navigate(['/login']);
    });
  }


  payFine(id: number): void {
    this.finesService.payFine(this.requestOptions, id)
    .subscribe(res => {
      this.initFetch();
    }, err=> {
      console.log(err);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
