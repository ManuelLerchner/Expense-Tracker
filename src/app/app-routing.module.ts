import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyComponent } from './pages/home-children/modify/modify.component';
import { DashboardComponent } from './pages/home-children/dashboard/dashboard.component';
import { AboutComponent } from './pages/home-children/about/about.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { TableComponent } from './pages/home-children/table/table.component';
import { ChartsComponent } from './pages/home-children/charts/charts.component';
import { GalleryComponent } from './pages/home-children/gallery/gallery.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/dashboard', pathMatch: 'full' },
  { path: 'home', redirectTo: 'home/dashboard', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'modify', component: ModifyComponent },

      { path: 'charts', component: ChartsComponent },
      { path: 'table', component: TableComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'about', component: AboutComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' ,useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
