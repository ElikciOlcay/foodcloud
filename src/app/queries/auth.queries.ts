import { Injectable } from '@angular/core';
import {  QueryEntity } from '@datorama/akita';
import { UserModel } from '../models/user.model';
import { AuthState, AuthStore } from '../store/auth.store';

@Injectable({providedIn: 'root'})
export class AuthQuery extends QueryEntity<AuthState, UserModel> {

  isLoggedIn = this.select(state => !!state.isAuth)

  constructor(protected store: AuthStore) {
    super(store);
  }

  get isAuth(): boolean {
    return this.getValue().isAuth;
  }
}
