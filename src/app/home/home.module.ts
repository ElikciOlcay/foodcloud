import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { LoginComponent } from '../login/login.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class HomeModule { }
