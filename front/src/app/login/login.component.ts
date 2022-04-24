import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  @Output() submitEM = new EventEmitter();

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private _userInfo: UserInfoService,
    private router: Router,
    private _api: ApiService
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

    const idUser = 3;
    this._userInfo.setUserInfo(2);
    localStorage.setItem('user', idUser.toString())
    let teste = this._userInfo.getUserInfo();
  }

  saveNewUser() {
    return new Promise((resolve, reject) => {
      this._api.post('/cliente', this.form)
        .subscribe((response: any) => {
          resolve(response)
        }, reject)
    })
  }
}
