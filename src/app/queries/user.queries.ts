import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UserModel } from '../models/user.model';
import { UserState, UserStore } from '../store/user.store';

@Injectable({providedIn: 'root'})
export class UserQuery extends QueryEntity<UserState, UserModel> {
  constructor(protected store: UserStore) {
    super(store);
  }
}
