import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Exercises } from '../shared/interfaces/exercises.interface';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss']
})
export class ExercisesListComponent implements OnInit {

  constructor(
    private router: Router,
    private _api: ApiService
  ) { }

  displayedColumns: string[] = ['name'];
  clickedRow: Exercises = {} as Exercises;
  dataSource: Exercises[] = [];

  @ViewChild(MatTable) table: MatTable<Exercises>;

  ngOnInit(): void {
    this.renderGrid();
  }

  renderGrid(): void {
    new Promise((resolve, reject) => {
      this._api.get('/exercicio')
        .subscribe((response: any[]) => {
          console.log(response);
          
          response.forEach(x => {
            if (x.name !== '' && x.email !== '') {
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

  clickGrid(row: Exercises): void {
    this.router.navigate(['/exercises/' + row.id + '']);
  }

  add(): void {
    this.router.navigate(['/exercises']);
  }
}