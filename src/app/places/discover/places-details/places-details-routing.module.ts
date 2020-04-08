import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacesDetailsPage } from './places-details.page';

const routes: Routes = [
  {
    path: '',
    component: PlacesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesDetailsPageRoutingModule {}
