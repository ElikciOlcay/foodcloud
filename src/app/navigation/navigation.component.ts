import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  private authSubs: Subscription;
  isAuth: boolean;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authSubs = this.auth.authChanged.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  logOut(): void {
    this.auth.logOut();
  }

  navToLogin(): void {
    this.router.navigate(['/']);
  }

}
