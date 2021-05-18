import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AuthQuery } from '../queries/auth.queries';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  isLoading$: Observable<boolean>;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private authQuery: AuthQuery,
    ) { }

  ngOnInit(): void {
    this.isLoading$ = this.authQuery.selectLoading();
  }

  onSubmit(): void {
    const user: UserModel = this.loginForm.value;
    this.auth.loginUser(user);
  }

}
