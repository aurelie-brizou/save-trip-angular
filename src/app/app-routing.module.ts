import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TripComponent } from './trip/trip.component';
import {TripEditComponent} from "./trip-edit/trip-edit.component";


const routes: Routes = [
  { path: 'trips', component: TripListComponent },
  { path: 'form-trip', component: TripFormComponent },
  { path: 'trip/:id', component: TripComponent, data: { title: 'Détail du voyage' } },
  { path: 'edit-trip/:id', component: TripEditComponent, data: { title: 'Modifier le voyage' } },
  { path: '',   redirectTo: '/trips', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
