import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { UserModel } from '../models/user.model';
import { AuthQuery } from '../queries/auth.queries';
import { AuthStore } from '../store/auth.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any;
  user: UserModel;

  constructor(
    private db: AngularFirestore,
    private authStore: AuthStore,
    private authQuery: AuthQuery,
    private auth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar) {
      this.authStore.setLoading(false);
  }

  initAuthListener(): void {
    this.authQuery.isLoggedIn
      .subscribe(auth => {
        if (auth) {

        }
      });
  }

  loginUser(user: UserModel): void {
    this.authStore.setLoading(true);
    this.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(result => {
      this.authStore.update({isAuth: true});
      this.setUser(result.user.uid);
      this.authStore.setLoading(false);
      }).catch(err => {
        this.authStore.setLoading(false);
        this.snackBar.open(err.message, '', {
          duration: 3000
        });
      });
  }

  registerUser(user: UserModel): void {
    this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logOut(): void {
    this.auth.signOut().then( res => {
      this.authStore.update({isAuth: false});
      this.router.navigate(['']);
    });
  }

  isAuth(): boolean {
    return this.authQuery.isAuth;
  }

  getCurrentUser(): UserModel {
    let user: UserModel[];
    this.authQuery.selectAll().subscribe(usert => {
      user = usert;
    });
    return user[0];
  }

  setUser(uid: string): void {
    const userDoc = this.db.doc<UserModel>('users/' + uid);
    userDoc.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data() as UserModel;
          const uid = changes.payload.id;
          return {uid, ...data};
        })
      ).subscribe( user => {
        if (this.authQuery.isAuth && user.admin ){
          this.user = user;
          this.authStore.set([user]);
          this.authStore.update({isAuth: true});
          this.router.navigate(['/orders']);
        }
      });
  }
}
