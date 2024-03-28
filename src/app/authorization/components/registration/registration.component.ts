import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent  implements OnInit {
  registerForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async submitForm() {
    const userName = this.registerForm.get('userName')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    try {
      let credentials = await this.authService.register({
        userName,
        email,
        password,
      });
      if (credentials.status === 200) {
        this.router.navigate(['dashboard']);
      }
    } catch (err: any) {
      if (err) {
        console.log('err in login');
        console.log(err);
      }
    }
  }

  login() {
    this.router.navigate(['login']);
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
