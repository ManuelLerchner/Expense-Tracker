import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyComponent } from './layout/home/modify/modify.component';
import { DashboardComponent } from './layout/home/dashboard/dashboard.component';
import { AboutComponent } from './layout/home/about/about.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './layout/login/login.component';
import { MainViewComponent } from './layout/main-view/main-view.component';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/dashboard', pathMatch: 'full' },
  { path: 'home', redirectTo: 'home/dashboard', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
 
  {
    path: 'home',
    component: MainViewComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'modify', component: ModifyComponent },

      { path: 'about', component: AboutComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
