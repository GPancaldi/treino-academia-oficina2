import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { UserInfoService } from '../shared/services/user-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  isRegister = false;
  usersList: any[];

  @Output() submitEM = new EventEmitter();

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    user_role_id: new FormControl(''),
  });

  constructor(
    private _userInfo: UserInfoService,
    private router: Router,
    private _api: ApiService,
    private _snackBar: MatSnackBar
  ) { }

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }

  ngOnInit(): void {
    if(this._userInfo.getUserInfo() && this._userInfo.getUserInfo() !== 0)
      this.router.navigate(['/customers']);
  }

  getErrorMessage() {
    if (this.form.controls.email.hasError('required'))
      return 'You must enter a value';

    return this.form.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  onRegister() {
    this.isRegister = true;
    this.form.controls.name.setValidators([Validators.required]);
  }

  onRegisterSubmit() {
    if(!this.form.valid)
      return;

    this.saveNewUser();

    this.isRegister = false;
    this.form.controls.name.setValidators(null);
  }

  onLogin() {
    return new Promise((resolve, reject) => {
      this._api.post('/user/login', this.form.value)
        .subscribe((response: any) => {
          const idUser = 3;
          this._userInfo.setUserInfo(2);
          localStorage.setItem('user', idUser.toString())
          console.log(response)
          this.router.navigate(['/customers']);
          resolve(response)
        }, reject)
    })
  }

  async autenticate() {
    try {
      await this.onLogin()
    }
    catch(error) {
      this._snackBar.open('Login Inválido!', '', {duration: 10000});
    }
  }

  saveNewUser() {
    this.form.patchValue({
      user_role_id: 1
    });
    return new Promise((resolve, reject) => {
      this._api.post('/user', this.form.value)
        .subscribe((response: any) => {
          resolve(response)
        }, reject)
    })
  }

  autenticateUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._api.post('/user/login', this.form.value)
        .subscribe((response: any) => {
          console.log(response)
          resolve(response)
        }, reject)
    })
  }
}
