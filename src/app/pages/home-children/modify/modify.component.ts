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

  async loadExpenses() {
    try {
      let expenses = await this.expenseService
        .getExpensesForCurrentUser()
        .toPromise();

      let sortedExpenses = expenses.sort((a, b) => {
        return b.date.getTime() - a.date.getTime();
      });

      this.expenses = sortedExpenses;

      this.editableExpenses = this.expenses.map((expense) => {
        return { ...expense, editable: false };
      });
    } catch (e: any) {
      console.log(e.error);
    }
  }

  async updateExpense(newExpense: Expense) {
    try {
      let toUpdate = this.expenseService.convertToStoredExpense(newExpense);

      await this.expenseService.updateExpense(toUpdate).toPromise();

      this.loadExpenses();
    } catch (e: any) {
      console.log(e.error);
    }
  }

  async addExpense(newExpense: Expense) {
    try {
      let toAdd = this.expenseService.convertToStoredExpense(newExpense);

      await this.expenseService.addExpense(toAdd).toPromise();

      this.table.clearNewData();
      this.loadExpenses();
    } catch (e: any) {
      console.log(e.error);
    }
  }

  async deleteExpense(id: number) {
    try {
      await this.expenseService.deleteExpense(id).toPromise();

      this.loadExpenses();
    } catch (e: any) {
      console.log(e.error);
    }
  }
}
