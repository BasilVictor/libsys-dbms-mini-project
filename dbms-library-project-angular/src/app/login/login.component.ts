import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthService,
    @Inject('BaseURL') private BaseURL) { }

  hide = true;

  ngOnInit(): void {
  }

  login(): void {
    this.authService.signIn({memb_id: 101})
    .subscribe(res => {
      localStorage.setItem('accessToken', res.accessToken);
      if(res.memb_type == 1 || res.memb_type == 2)
        this.router.navigate(['/home']);
    });
  }

}
