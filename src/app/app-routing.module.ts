import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyComponent } from './pages/home-children/modify/modify.component';
import { DashboardComponent } from './pages/home-children/dashboard/dashboard.component';
import { AboutComponent } from './pages/home-children/about/about.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { MainViewComponent } from './pages/home/main-view.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/auth/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/dashboard', pathMatch: 'full' },
  { path: 'home', redirectTo: 'home/dashboard', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

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
