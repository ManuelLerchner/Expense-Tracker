import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/Expense';
import { ExpensesService } from 'src/app/services/expenses.service';
import {
  biggestCategorySpendings,
  biggestSingleSpending,
  calculateMonthlySpending,
  loadAccumulativeExpenses,
  loadAllExpenses,
  loadCategories,
} from '../dataHelper';

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

  constructor(private expensesService: ExpensesService) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  async loadExpenses() {
    let dbData: Expense[] = await this.expensesService
      .getExpensesForCurrentUser()
      .toPromise();

    let sortedData = dbData.sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });

    let sortedLabels = sortedData.map((expense) => {
      return expense.date.toLocaleDateString();
    });

    let { lineChartData_total, lineChartLabels_total } = loadAllExpenses(
      sortedData,
      sortedLabels
    );

    let {
      lineChartData_accumulative,
      lineChartLabels_accumulative,
      totalSpending,
    } = loadAccumulativeExpenses(sortedData, sortedLabels);

    let { biggestSpendingDescription, biggestSpendingAmount } =
      biggestSingleSpending(sortedData);

    let { monthlySpending, monthlyChange } =
      calculateMonthlySpending(sortedData);

    let { biggestCategoryName, biggestCategoryShare } =
      biggestCategorySpendings(sortedData);

    let { doughnutChartLabels, doughnutChartData } = loadCategories(sortedData);

    this.lineChartLabels_accumulative = lineChartLabels_accumulative;
    this.lineChartData_accumulative = lineChartData_accumulative;

    this.lineChartData_total = lineChartData_total;
    this.lineChartLabels_total = lineChartLabels_total;

    this.doughnutChartLabels = doughnutChartLabels;
    this.doughnutChartData = doughnutChartData;

    this.monthlySpending = monthlySpending;
    this.monthlyChange = monthlyChange;

    this.biggestCategoryName = biggestCategoryName;
    this.biggestCategoryShare = biggestCategoryShare;

    this.biggestSpendingDescription = biggestSpendingDescription;
    this.biggestSpendingAmount = biggestSpendingAmount;

    this.totalSpending = totalSpending;
  }
}
