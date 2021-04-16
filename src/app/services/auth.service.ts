import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean;
  authChanged = new Subject<boolean>();
  loadingChanged = new Subject<boolean>();
  authState: any;

  constructor(private auth: AngularFireAuth, private router: Router, private snackBar: MatSnackBar) {
    this.initAuthListener();
  }


  initAuthListener(): void {
    this.auth.authState.subscribe(authState => {
      if (authState) {
        this.authState = authState;
        this.isAuthenticated = true;
        this.authChanged.next(true);
        this.router.navigate(['/orders']);
      } else {
        this.isAuthenticated = false;
        this.authChanged.next(false);
        this.router.navigate(['']);
      }
    });
  }

  loginUser(user: UserModel): void {
    this.loadingChanged.next(true);
    this.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(result => {
        this.loadingChanged.next(false);
      }).catch(err => {
        this.loadingChanged.next(false);
        this.snackBar.open(err.message, '', {
          duration: 3000
        });
      });
  }

  registerUser(user: UserModel): void {
    this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logOut(): void {
    this.auth.signOut();
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUserId(): string {
    return this.isAuthenticated ? this.authState.uid : null;
  }


}
