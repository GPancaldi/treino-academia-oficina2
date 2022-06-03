import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercises } from '../shared/interfaces/exercises.interface';
import { ApiService } from '../shared/services/api.service';
import { UserInfoService } from '../shared/services/user-info.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})

export class WorkoutsComponent implements OnInit {

  constructor(
    private _userInfo: UserInfoService,
    private router: Router,
    private _api: ApiService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar
    ) { }

  exercisesList: any[];
  isNew = true;
  userId = '';

  displayedColumns: string[] = ['name', 'series', 'reps'];
  clickedRow: Exercises = {} as Exercises;
  dataSource: Exercises[] = [];

  @ViewChild(MatTable) table: MatTable<Exercises>;

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    if(!this._userInfo.getUserInfo())
      this.router.navigate(['/login']);

    this.route.paramMap.subscribe(params => {
      if (params.get('id') !== null) {
        this.isNew = false;
        this.userId = params.get('id');
        this.renderForm(params.get('id'))
        this.renderGrid(params.get('id'));
      }
    });
  }

  saveNew() {
    return new Promise((resolve, reject) => {
      this._api.post('/treino', this.form.value)
        .subscribe((response: any) => {
          console.log(response);
          this._snackBar.open('Registro Salvo com Sucesso!', '',  { duration: 2000 })
          this.router.navigate(['/workouts-list'])
          resolve(response)
        }, reject)
    })
  }

  renderForm(id: string): void {
    new Promise((resolve, reject) => {
      this._api.get('/treino/' + id + '')
        .subscribe((response: any) => {
          console.log(response);
          
          this.form.patchValue({
            name: response[0].name,
          });

          this.cdRef.detectChanges();
          resolve(response)
        }, reject)
    })
  }

  saveEdit() {
    debugger;
    return new Promise((resolve, reject) => {
      this._api.put('/treino/' + this.userId, this.form.value)
        .subscribe((response: any) => {
          console.log(response);
          this._snackBar.open('Registro Editado com Sucesso!', '',  { duration: 2000 })
          this.router.navigate(['/workouts-list'])
          resolve(response)
        }, reject)
    })
  }

  delete() {
    return new Promise((resolve, reject) => {
      this._api.delete('/treino/' + this.userId)
        .subscribe((response: any) => {
          console.log(response);
          this._snackBar.open('Registro Deletado com Sucesso!', '',  { duration: 2000 })
          this.router.navigate(['/workouts-list'])
          resolve(response)
        }, reject)
    })
  }

  renderGrid(id: string): void {
    new Promise((resolve, reject) => {
      this._api.get('/treino/' + id)
        .subscribe((response: any[]) => {
          console.log(response);
          
          response[0].exercicios.forEach((x: { name: string; id: any; repeticoes: any; series: any; treino_group_id: any; }) => {
            if (x.name !== '') {
              this.dataSource.push({
                id: x.id,
                name: x.name,
                reps: x.repeticoes,
                series: x.series,
                workout: x.treino_group_id
              })
            }
          });
          
          this.table.renderRows();
          resolve(response)
        }, reject)
    })
  }

  showButtons(): boolean {
    if(localStorage.getItem('userRole') === '2')
      return false;
    else 
      return true;
  }
}

