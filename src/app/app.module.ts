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
import { TableComponent } from './components/table/table.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './pages/home-children/about/about.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MainViewComponent } from './pages/home/main-view.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/auth/register/register.component';

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
    TableComponent,
    AboutComponent,
    MainViewComponent,
    LoginComponent,
    NotFoundComponent,
    RegisterComponent,
    StatisticItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    NgbModule,
    MatCardModule,
    NgChartsModule,
    FormsModule,
    MatChipsModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
