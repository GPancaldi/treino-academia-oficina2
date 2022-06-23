import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
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
    cpf: new FormControl('', [Validators.required]),
    rg: new FormControl('', [Validators.required]),
    data_nascimento: new FormControl('', [Validators.required]),
  });

  isNew = true;
  userId = '';

  constructor(
    private _userInfo: UserInfoService,
    private router: Router,
    private _api: ApiService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('id') !== null) {
        this.isNew = false;
        this.userId = params.get('id');
        this.renderForm(params.get('id'))
      }
    });
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
    return '';
  }

  getErrorMessageEmail() {
    if (this.form.controls.email.hasError('required')) {
      return 'Insira um email válido!';
    }

    return this.form.controls.email.hasError('email') ? 'Email inválido!' : '';
  }

  saveNew() {
    debugger;
    this.form.patchValue({
      user_role_id: 2,
      data_nascimento: new Date(this.form.controls.data_nascimento.value)
    });
    return new Promise((resolve, reject) => {
      this._api.post('/user', this.form.value)
        .subscribe((response: any) => {
          console.log(response);
          this._snackBar.open('Registro Salvo com Sucesso!', '',  { duration: 2000 })
          this.router.navigate(['/customers-list'])
          resolve(response)
        }, reject)
    })
  }

  saveEdit() {
    let obj = {
      name : this.form.value.name,
      email : this.form.value.email,
      password : this.form.value.password,
      user_role_id : 2
    }

    return new Promise((resolve, reject) => {
      this._api.put('/user/' + this.userId, obj)
        .subscribe((response: any) => {
          console.log(response);
          this._snackBar.open('Registro Editado com Sucesso!', '',  { duration: 2000 })
          this.router.navigate(['/customers-list'])
          resolve(response)
        }, reject)
    })
  }

  delete() {
    return new Promise((resolve, reject) => {
      this._api.delete('/user/' + this.userId)
        .subscribe((response: any) => {
          console.log(response);
          this._snackBar.open('Registro Deletado com Sucesso!', '',  { duration: 2000 })
          this.router.navigate(['/customers-list'])
          resolve(response)
        }, reject)
    })
  }

  renderForm(id: string): void {
    new Promise((resolve, reject) => {
      this._api.get('/user/' + id + '')
        .subscribe((response: any) => {
          console.log(response);
          
          this.form.patchValue({
            name: response[0].name,
            email: response[0].email,
            password: response[0].password
          });

          this.cdRef.detectChanges();
          resolve(response)
        }, reject)
    })
  }
}
