import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { TableComponent } from 'src/app/components/table/table.component';
import { Expense } from 'src/app/models/Expense';
import { StoredExpense } from 'src/app/models/StoredExpense';
import { ExpensesService } from './../../../services/expenses.service';

@Component({
  selector: 'app-add',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss', '../shared.style.scss'],
})
export class ModifyComponent implements OnInit {
  constructor(private expenseService: ExpensesService) {}

  @ViewChild(TableComponent) table!: TableComponent;

  expenses: Expense[] = [];
  editableExpenses: Expense[] = [];

  ngOnInit() {
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenseService
      .getExpensesForCurrentUser()
      .pipe(first())
      .subscribe({
        next: (expenses: Expense[]) => {
          let sortedExpenses = expenses.sort((a, b) => {
            return b.date.getTime() - a.date.getTime();
          });

          this.expenses = sortedExpenses;
          this.editableExpenses = sortedExpenses.map((expense) => {
            return { ...expense };
          });
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  async updateExpense(newExpense: Expense) {
    let toUpdate = this.expenseService.convertToStoredExpense(newExpense);

    await this.expenseService.updateExpense(toUpdate).toPromise();

    this.loadExpenses();
  }

  async addExpense(newExpense: Expense) {
    let toAdd = this.expenseService.convertToStoredExpense(newExpense);

    await this.expenseService.addExpense(toAdd).toPromise();

    this.table.clearNewData();
    this.loadExpenses();
  }

  async deleteExpense(id: number) {
    await this.expenseService.deleteExpense(id).toPromise();

    this.loadExpenses();
  }
}
