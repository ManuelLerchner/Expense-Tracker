import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/Expense';
import { ChartService } from 'src/app/services/chart.service';
import { ExpensesService } from 'src/app/services/expenses.service';
import {
  biggestCategorySpendings,
  biggestSingleSpending,
  calculateMonthlySpending,
  loadAccumulativeExpenses,
  loadAllExpenses,
  loadCategories,
} from '../../../services/dataHelper';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss', '../shared.style.scss'],
})
export class ChartsComponent implements OnInit {
  public lineChartLabels_accumulative: string[] = [];
  public lineChartLabels_total: string[] = [];

  public lineChartData_accumulative: any[] = [];
  public lineChartData_total: any[] = [];

  public doughnutChartLabels: string[] = [];
  public doughnutChartData: any = [];

  public monthlySpending: number = 0;
  public monthlyChange: number = 0;

  public totalSpending: number = 0;
  public biggestCategoryName: string = '';
  public biggestCategoryShare: number = 0;
  public biggestSpendingDescription: string = '';
  public biggestSpendingAmount: number = 0;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    let data = await this.chartService.loadExpenses();
    this.lineChartLabels_accumulative = data.lineChartLabels_accumulative;
    this.lineChartLabels_total = data.lineChartLabels_total;
    this.lineChartData_accumulative = data.lineChartData_accumulative;
    this.lineChartData_total = data.lineChartData_total;
    this.doughnutChartLabels = data.doughnutChartLabels;
    this.doughnutChartData = data.doughnutChartData;
    this.monthlySpending = data.monthlySpending;
    this.monthlyChange = data.monthlyChange;
    this.totalSpending = data.totalSpending;
    this.biggestCategoryName = data.biggestCategoryName;
    this.biggestCategoryShare = data.biggestCategoryShare;
    this.biggestSpendingDescription = data.biggestSpendingDescription;
    this.biggestSpendingAmount = data.biggestSpendingAmount;
  }
}
