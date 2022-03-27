import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { ModifyComponent } from './layout/modify/modify.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    SidenavComponent,
    UserDropdownComponent,
    ModifyComponent,
    ItemCardComponent,
    LineChartComponent,
    DoughnutChartComponent,
    TableComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
