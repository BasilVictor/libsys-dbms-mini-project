import { Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { FinesComponent } from '../fines/fines.component';

export const routes: Routes = [
  { path: 'login',  component: LoginComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'book/:book_id',  component: BookDetailComponent },
  { path: 'fines', component: FinesComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];