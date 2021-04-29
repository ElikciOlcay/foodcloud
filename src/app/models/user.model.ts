import { ID } from '@datorama/akita';

export interface UserModel {
  id?: ID;
  email: string;
  password: string;
}
