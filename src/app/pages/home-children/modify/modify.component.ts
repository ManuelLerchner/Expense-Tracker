import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { SmartTableComponent } from 'src/app/components/smart-table/smart-table.component';
import { Expense } from 'src/app/models/Expense';
import { StoredExpense } from 'src/app/models/StoredExpense';
import { ExpensesService } from './../../../services/expenses.service';

import { loadExpenses } from '../dataHelper';

@Component({
  selector: 'app-add',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss', '../shared.style.scss'],
})
export class ModifyComponent implements OnInit {
  constructor(private expenseService: ExpensesService) {}

  @ViewChild(SmartTableComponent) table!: SmartTableComponent;

  expenses: Expense[] = [];
  editableExpenses: Expense[] = [];

  ngOnInit() {
    this.updateData();
  }

  updateData() {
    loadExpenses(this.expenseService).then((data) => {
      this.expenses = data['sortedExpenses'];
      this.editableExpenses = data['editableExpenses'];
    });
  }

  async updateExpense(newExpense: Expense) {
    try {
      let toUpdate = this.expenseService.convertToStoredExpense(newExpense);

      await this.expenseService.updateExpense(toUpdate).toPromise();
      this.table.showSnackBar('Expense updated.', 'Close');
      this.updateData();
    } catch (e: any) {
      console.log(e.error);
    }
  }

  async addExpense(newExpense: Expense) {
    try {
      let toAdd = this.expenseService.convertToStoredExpense(newExpense);

      await this.expenseService.addExpense(toAdd).toPromise();

      this.table.clearNewData();
      this.table.showSnackBar('Expense added.', 'Close');
      this.updateData();
    } catch (e: any) {
      console.log(e.error);
    }
  }

  async deleteExpense(id: number) {
    try {
      await this.expenseService.deleteExpense(id).toPromise();

      this.table.showSnackBar('Expense deleted.', 'Close');
      this.updateData();
    } catch (e: any) {
      console.log(e.error);
    }
  }
}
