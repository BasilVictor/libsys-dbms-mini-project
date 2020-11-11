import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthService,
    private snackbar: SnackbarService,
    @Inject('BaseURL') private BaseURL) { }

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
      this.snackbar.showSnackbar('Invalid credentials');
    });
  }

}
