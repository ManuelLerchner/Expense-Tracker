import { Component, OnInit, ViewChild } from '@angular/core';
import { filter, first } from 'rxjs/operators';
import { SmartTableComponent } from 'src/app/components/smart-table/smart-table.component';
import { Expense } from 'src/app/models/Expense';
import { StoredExpense } from 'src/app/models/StoredExpense';
import { ExpensesService } from './../../../services/expenses.service';

import { loadExpenses } from '../../../services/dataHelper';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-add',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss', '../shared.style.scss'],
})
export class ModifyComponent implements OnInit {
  @ViewChild(SmartTableComponent) table!: SmartTableComponent;

  formGroup!: FormGroup;
  expenses: Expense[] = [];

  filteredExpenses$: Expense[] = [];

  formatDate(date: Date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return dd + '.' + mm + '.' + yyyy;
  }

  constructor(
    private expenseService: ExpensesService,
    formBuilder: FormBuilder
  ) {
    this.formGroup = formBuilder.group({ filter: [''] });

    this.formGroup.get('filter')?.valueChanges.subscribe((value) => {
      this.filter(value);
    });
  }

  ngOnInit() {
    this.updateData();
  }

  filter(value: string) {
    this.filteredExpenses$ = this.expenses.filter((expense: any) => {
      return (
        expense.description.toLowerCase().includes(value.toLowerCase()) ||
        expense.categories
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        (expense.amount.toString() + ' €')
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        this.formatDate(new Date(expense.date))
          .toLowerCase()
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        expense.id.toString().toLowerCase().includes(value.toLowerCase())
      );
    });
  }
  updateData() {
    loadExpenses(this.expenseService).then((data) => {
      this.expenses = data['sortedExpenses'];

      let value = this.formGroup.get('filter')?.value || '';

      this.filter(value);
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
