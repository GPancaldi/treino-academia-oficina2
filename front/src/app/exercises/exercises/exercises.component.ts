import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Workout } from 'src/app/shared/interfaces/workouts.interface';
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
    reps: new FormControl('', [Validators.required]),
    series: new FormControl('', [Validators.required]),
  });

  dataSource: Workout[] = [];
  isNew = true;
  userId = '';
  selected: any;

  constructor(
    private _userInfo: UserInfoService,
    private router: Router,
    private _api: ApiService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    if(!this._userInfo.getUserInfo())
      this.router.navigate(['/login']);

    this.route.paramMap.subscribe(params => {
      if (params.get('id') !== null) {
        this.isNew = false;
        this.userId = params.get('id');
        this.renderForm(params.get('id'))
      }
    });

    this.loadTreinos();
  }

  loadTreinos(): void {
    new Promise((resolve, reject) => {
      this._api.get('/treino')
        .subscribe((response: any[]) => {
          console.log(response);
          
          response.forEach(x => {
            if (x.name !== '') {
              if (x.name !== '') {
                this.dataSource.push({
                  id: x.id,
                  name: x.name,
                })
              }
            }
          });


          
          this.cdRef.detectChanges();
          resolve(response)
        }, reject)
    })
  }

  renderForm(id: string): void {
    new Promise((resolve, reject) => {
      this._api.get('/exercicio/' + id + '')
        .subscribe((response: any) => {
          console.log(response);
          
          this.form.patchValue({
            name: response[0].name,
            reps: response[0].repeticoes,
            series: response[0].series,
          });

          this.selected = response[0].treino_group_id;

          this.cdRef.detectChanges();
          resolve(response)
        }, reject)
    })
  }

  saveEdit() {
    var obj = {
      name: this.form.value.name,
      treino_group_id: this.selected,
      repeticoes: this.form.value.reps.toString(),
      series: this.form.value.series.toString()
    }

    return new Promise((resolve, reject) => {
      this._api.put('/exercicio/' + this.userId, obj)
        .subscribe((response: any) => {
          console.log(response);
          this._snackBar.open('Registro Editado com Sucesso!', '',  { duration: 2000 })
          this.router.navigate(['/exercises-list'])
          resolve(response)
        }, reject)
    })
  }

  delete() {
    return new Promise((resolve, reject) => {
      this._api.delete('/exercicio/' + this.userId)
        .subscribe((response: any) => {
          console.log(response);
          this._snackBar.open('Registro Deletado com Sucesso!', '',  { duration: 2000 })
          this.router.navigate(['/exercises-list'])
          resolve(response)
        }, reject)
    })
  }

  saveNew() {
    var obj = {
      name: this.form.value.name,
      treino_group_id: this.selected,
      repeticoes: this.form.value.reps.toString(),
      series: this.form.value.series.toString()
    }

    return new Promise((resolve, reject) => {
      this._api.post('/exercicio', obj)
        .subscribe((response: any) => {
          console.log(response);
          this._snackBar.open('Registro Salvo com Sucesso!', '',  { duration: 2000 })
          this.router.navigate(['/exercises-list'])
          resolve(response)
        }, reject)
    })
  }
}
