import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { UserInfoService } from '../shared/services/user-info.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  
  form: FormGroup = new FormGroup({
    name:  new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email:  new FormControl('', [Validators.required, Validators.email]),
    user_role_id: new FormControl(''),
  });

  constructor(
    private _userInfo: UserInfoService,
    private router: Router,
    private _api: ApiService
    ) { }

  ngOnInit(): void {
    if(!this._userInfo.getUserInfo())
      this.router.navigate(['/login']);
  }

  getErrorMessage(form: string) {

    switch(form) {
      case 'name': {
        if (this.form.controls.name.hasError('required')) {
          return 'Insira um nome válido!';
        }
      };
      break;
      case 'password': {
        if (this.form.controls.password.hasError('required')) {
          return 'Insira uma senha válida!';
        }
      };
      break;
    }
    return;
  }

  getErrorMessageEmail() {
    if (this.form.controls.email.hasError('required')) {
      return 'Insira um email válido!';
    }

    return this.form.controls.email.hasError('email') ? 'Email inválido!' : '';
  }

  add() {
    this.form.patchValue({
      user_role_id: 2
    });
    return new Promise((resolve, reject) => {
      console.log('teste')
      this._api.post('/user', this.form.value)
        .subscribe((response: any) => {
          console.log(response);
          resolve(response)
        }, reject)
    })
  }
}
