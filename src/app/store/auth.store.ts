import { Injectable } from '@angular/core';
import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { UserModel } from '../models/user.model';

export interface AuthState extends EntityState<UserModel, string> {
  isAuth: boolean;
}

export function createInitialState(): AuthState {
  return {
    isAuth: false
  };
}

@Injectable({ providedIn: 'root'})
@StoreConfig({name: 'user'})
export class AuthStore extends EntityStore<AuthState, UserModel> {
  constructor() {
    super(createInitialState());
  }
}
