import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { UserModel } from '../models/user.model';

export interface UserState extends EntityState<UserModel, string> {};

@Injectable({ providedIn: 'root'})
@StoreConfig({name: 'user'})
export class UserStore extends EntityStore<UserState, UserModel> {
  constructor() {
    super();
  }
}
