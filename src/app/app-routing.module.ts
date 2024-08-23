import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff/staff.component';
import { StaffMajorFacilityComponent } from './staff-major-facility/staff-major-facility.component';

const routes: Routes = [
  {path:'staffs',component: StaffComponent},
  {path:'staffs/:id',component: StaffMajorFacilityComponent},
  {path: '', redirectTo: 'staffs', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
