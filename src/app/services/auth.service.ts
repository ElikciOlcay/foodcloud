import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthQuery } from '../queries/auth.queries';
import { AuthStore } from '../store/auth.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
    this.auth.signOut().then( () => {
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
          this.authStore.add(user);
          this.authStore.update({isAuth: true});
          this.snackBar.open(`Hallo ${user.name}`, '', {
            duration: 2000
          });
          this.router.navigate(['/orders']);
        }
      });
  }
}
