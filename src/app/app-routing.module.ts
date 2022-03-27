import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyComponent } from './layout/modify/modify.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'modify', component: ModifyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
