import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../shared/interfaces/user.interface';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  constructor(
    private router: Router,
    private _api: ApiService
  ) { }

  displayedColumns: string[] = ['name', 'email'];
  clickedRow: User = {} as User;
  dataSource: User[] = [];

  @ViewChild(MatTable) table: MatTable<User>;

  ngOnInit(): void {
    this.renderGrid();
  }

  renderGrid(): void {
    new Promise((resolve, reject) => {
      this._api.get('/user')
        .subscribe((response: any[]) => {
          console.log(response);
          
          response.forEach(x => {
            if (x.name !== '' && x.email !== '') {
              this.dataSource.push({
                id: x.id,
                name: x.name,
                email: x.email
              })
            }
          });
          
          this.table.renderRows();
          resolve(response)
        }, reject)
    })
  }

  clickGrid(row: User): void {
    this.router.navigate(['/customers/' + row.id + '']);
  }

  add(): void {
    this.router.navigate(['/customers']);
  }
}
