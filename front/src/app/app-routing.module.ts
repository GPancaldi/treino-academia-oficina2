import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { GymsComponent } from './gyms/gyms.component';
import { WorkoutsComponent } from './workouts/workouts.component';

const routes: Routes = [
  {
    path:'', redirectTo:'customers', pathMatch: 'full'
  },
  {
    path:'customers', component: CustomersComponent
  },
  {
    path:'gyms', component: GymsComponent
  },
  {
    path:'workouts', component: WorkoutsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
