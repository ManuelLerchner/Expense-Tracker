import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExpensesService } from 'src/app/services/expenses.service';
import { map } from 'rxjs/operators';
import { Expense } from 'src/app/models/Expense';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../shared.style.scss'],
  host: {
    class: 'fullWidth',
  },
})
export class DashboardComponent implements OnInit {
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

    this.loadAllExpenses(sortedData, sortedLabels);
    this.loadAccumulativeExpenses(sortedData, sortedLabels);
    this.loadCategories(sortedData);
    this.calculateMonthlySpending(sortedData);
    this.biggestCategorySpendings(sortedData);
    this.biggestSingleSpending(sortedData);
  }

  loadAllExpenses(sortedData: Expense[], sortedLabels: string[]) {
    let totalData = sortedData.map((expense) => {
      return expense.amount;
    });

    this.lineChartData_total = [
      {
        data: totalData,
        label: 'Expenses',
      },
    ];

    this.lineChartLabels_total = sortedLabels;
  }

  loadAccumulativeExpenses(sortedData: Expense[], sortedLabels: string[]) {
    let accumulativeData = sortedData
      .map((expense) => {
        return expense.amount;
      })
      .map(
        (
          (sum: number) => (value: number) =>
            (sum += value)
        )(0)
      );

    this.lineChartData_accumulative = [
      {
        data: accumulativeData,
        label: 'Accumulative Expenses',
      },
    ];

    this.totalSpending = accumulativeData[accumulativeData.length - 1] || 0;

    this.lineChartLabels_accumulative = sortedLabels;
  }

  loadCategories(sortedData: Expense[]) {
    let allCategories = sortedData.reduce((accum: any, curr: any) => {
      if (curr.categories.length > 0) {
        return [...accum, ...curr.categories];
      } else {
        return [...accum, 'No category'];
      }
    }, []);

    let categoriesCount = allCategories.reduce((accum: any, curr: any) => {
      if (accum[curr]) {
        accum[curr]++;
      } else {
        accum[curr] = 1;
      }
      return accum;
    }, {});

    this.doughnutChartLabels = Object.keys(categoriesCount);

    this.doughnutChartData = [
      {
        data: Object.values(categoriesCount),
        label: 'Categories',
      },
    ];
  }

  calculateMonthlySpending(sortedExpenses: Expense[]) {
    let last31Days = sortedExpenses.filter((expense) => {
      return (
        expense.date.getTime() >= new Date().setDate(new Date().getDate() - 31)
      );
    });

    let previous31Days = sortedExpenses.filter((expense) => {
      return (
        expense.date.getTime() <
          new Date().setDate(new Date().getDate() - 31) &&
        expense.date.getTime() >= new Date().setDate(new Date().getDate() - 62)
      );
    });

    let thisMonthSpending = last31Days.reduce((accum: number, curr: any) => {
      return accum + curr.amount;
    }, 0);

    let previousMonthlySpending = previous31Days.reduce(
      (accum: number, curr: any) => {
        return accum + curr.amount;
      },
      0
    );

    let changePercentage = thisMonthSpending / previousMonthlySpending;

    this.monthlySpending = thisMonthSpending;
    this.monthlyChange = changePercentage;
  }

  biggestSingleSpending(sortedExpenses: Expense[]) {
    let biggestSingleSpending: any = {};
    try {
      biggestSingleSpending = sortedExpenses.reduce((accum: any, curr: any) => {
        return accum.amount > curr.amount ? accum : curr;
      });
    } catch (e) {}

    this.biggestSpendingDescription =
      'The biggest single expense is ' +
      (biggestSingleSpending.description || '-') +
      ' it was bought on ' +
      (biggestSingleSpending.description
        ? biggestSingleSpending.date.toLocaleDateString()
        : '-');
    this.biggestSpendingAmount = biggestSingleSpending.amount | 0;
  }

  biggestCategorySpendings(sortedExpenses: Expense[]) {
    let biggestCategory: any = {};

    sortedExpenses.forEach((expense) => {
      expense.categories.forEach((category) => {
        if (biggestCategory[category]) {
          biggestCategory[category] += expense.amount;
        } else {
          biggestCategory[category] = expense.amount;
        }
      });

      if (expense.categories.length === 0) {
        if (biggestCategory['Other']) {
          biggestCategory['Other'] += expense.amount;
        } else {
          biggestCategory['Other'] = expense.amount;
        }
      }
    });

    let bigestCategoryName;
    try {
      bigestCategoryName = Object.entries(biggestCategory).reduce(
        (accum: any, curr: any) => {
          return accum[1] > curr[1] ? accum : curr;
        }
      )[0];
    } catch (err) {
  
      if (!bigestCategoryName) {
        this.biggestCategoryName = '-';
        this.biggestCategoryShare = 0;
        return;
      }
    }

    this.biggestCategoryName = bigestCategoryName;
    this.biggestCategoryShare = biggestCategory[bigestCategoryName];
  }
}
