import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  onLogin() {
    this._authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: (_) => {
        this._router.navigate(['dashboard']);
      },
      error: (error) => {
        console.log(error);
        const UNAUTHORIZED_CREDETIALS_ERROR = 401;

        if(error.status === UNAUTHORIZED_CREDETIALS_ERROR) {
          this.loginForm.setErrors({ invalidCredentials: true });
        } else {
          this.loginForm.setErrors({ generalCredentialsError: true });
        }
      },

    })
  }


}
