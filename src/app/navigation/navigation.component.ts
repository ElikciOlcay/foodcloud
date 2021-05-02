import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthQuery } from '../queries/auth.queries';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isAuth$: Observable<boolean>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private authQuery: AuthQuery
    ) { }

  ngOnInit(): void {
    this.isAuth$ = this.authQuery.isLoggedIn;
  }

  logOut(): void {
    this.auth.logOut();
  }

  navToLogin(): void {
    this.router.navigate(['/']);
  }

}
