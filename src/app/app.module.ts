import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './pages/home-children/dashboard/dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';

import { StatisticItemComponent } from './components/statistic-item/statistic-item.component';
import { ModifyComponent } from './pages/home-children/modify/modify.component';

import { LineChartComponent } from './components/line-chart/line-chart.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { FormsModule } from '@angular/forms';
import { SmartTableComponent } from './components/smart-table/smart-table.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './pages/home-children/about/about.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginComponent } from './pages/auth/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { TableComponent } from './pages/home-children/table/table.component';
import { ChartsComponent } from './pages/home-children/charts/charts.component';
import { GalleryComponent } from './pages/home-children/gallery/gallery.component';
registerLocaleData(localeDe, 'de-DE', localeDeExtra);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    SidenavComponent,
    UserDropdownComponent,
    ModifyComponent,
    StatisticItemComponent,
    LineChartComponent,
    DoughnutChartComponent,
    SmartTableComponent,
    AboutComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent,
    StatisticItemComponent,
    TableComponent,
    ChartsComponent,
    GalleryComponent,
  ],
  imports: [
    BrowserModule,
    MatDividerModule,
    AppRoutingModule,
    MatIconModule,
    NgbModule,
    MatCardModule,
    NgChartsModule,
    FormsModule,
    MatChipsModule,
    MatInputModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
