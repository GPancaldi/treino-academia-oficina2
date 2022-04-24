import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { UserInfoService } from 'src/app/shared/services/user-info.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  
  form: FormGroup = new FormGroup({
    name:  new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    reps: new FormControl('', [Validators.required]),
    series: new FormControl('', [Validators.required]),
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

  add() {
    return new Promise((resolve, reject) => {
      this._api.post('/cliente', this.form.value)
        .subscribe((response: any) => {
          resolve(response)
        }, reject)
    })
  }

}
