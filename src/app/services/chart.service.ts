import { Injectable } from '@angular/core';
import { Expense } from '../models/Expense';
import {
  biggestCategorySpendings,
  biggestSingleSpending,
  calculateMonthlySpending,
  loadAccumulativeExpenses,
  loadAllExpenses,
  loadCategories,
} from './dataHelper';
import { ExpensesService } from './expenses.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private expensesService: ExpensesService) {}

  async loadExpenses() {
    let dbData: Expense[] = await this.expensesService
      .getExpensesForCurrentUser()
      .toPromise() || [];

    let sortedData = dbData.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    let sortedLabels = sortedData.map((expense) => {
      return expense.date;
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

    return {
      lineChartData_total,
      lineChartLabels_total,
      lineChartData_accumulative,
      lineChartLabels_accumulative,
      totalSpending,
      biggestSpendingDescription,
      biggestSpendingAmount,
      monthlySpending,
      monthlyChange,
      biggestCategoryName,
      biggestCategoryShare,
      doughnutChartLabels,
      doughnutChartData,
    };
  }
}
