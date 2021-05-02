import { ID } from '@datorama/akita';

export interface UserModel {
  id?: ID;
  uid: string;
  email: string;
  password?: string;
  name: string;
  admin?: boolean
}
