import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit() {}

  async submitForm() {
    const userName = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;
    try {
      let credentials = await this.authService.login({ userName, password });
      if(credentials.status === 200){
        this.router.navigate(['dashboard']);
      }
    } catch (err: any) {
      if (err) {
        console.log('err in login');
        console.log(err);
      }
    }
  }

  registerUser(){
    this.router.navigate(['register']);
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
