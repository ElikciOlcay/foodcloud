import { Menu } from './menu.model';

export interface OrderItem {
  menu: Menu;
  quanitity: number;
  total: number;
}
