import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private router: Router,
    private authService: AuthService,
    @Inject('BaseURL') private BaseURL,
    private _snackBar: MatSnackBar) { }

  hide = true;
  memb_id: number;

  ngOnInit(): void {
  }

  login(): void {
    this.authService.signIn({memb_id: this.memb_id})
    .subscribe(res => {
      localStorage.setItem('accessToken', res.accessToken);
      if(res.memb_type == 2 || res.memb_type == 3)
        this.router.navigate(['/home']);
      else
        this.router.navigate(['/admin'])
    }, err => {
      this._snackBar.open('Invalid Credentials', '', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });
  }

}
