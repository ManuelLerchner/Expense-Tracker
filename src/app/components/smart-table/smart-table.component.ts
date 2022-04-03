import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NavigationEnd, Router } from '@angular/router';
import { Expense } from 'src/app/models/Expense';
import { StoredExpense } from 'src/app/models/StoredExpense';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent implements OnInit {
  @Input() expenses: Expense[] = [];
  @Input() editableExpenses: Expense[] = [];

  @Output() onDelete = new EventEmitter<number>();
  @Output() onUpdate = new EventEmitter<Expense>();
  @Output() onAdd = new EventEmitter<Expense>();

  constructor(
    private expensesService: ExpensesService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {}

  newData: StoredExpense = {
    id: '',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    categories: '',
  };

  clickedInsideTable = false;
  enableEditIdx = -1;

  @HostListener('click')
  clickInside() {
    this.clickedInsideTable = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.clickedInsideTable) {
      if (this.enableEditIdx !== -1) {
        let rowIdx = Math.floor(this.enableEditIdx / 5);
        this.updateRow(rowIdx);
      }
      this.enableEditIdx = -1;
    }
    this.clickedInsideTable = false;
  }

  enableEditMethod(e: any, i: number) {
    this.clickedInsideTable = true;
    this.enableEditIdx = i;
  }

  updateRow(rowIdx: number) {
    let updatedExpense = this.expensesService.mapToExpense(
      this.editableExpenses[rowIdx]
    );

    if (
      updatedExpense.description !== this.expenses[rowIdx].description ||
      updatedExpense.amount !== this.expenses[rowIdx].amount ||
      new Date(updatedExpense.date).toDateString() !==
        new Date(this.expenses[rowIdx].date).toDateString() ||
      updatedExpense.categories.toString() !==
        this.expenses[rowIdx].categories.toString()
    ) {
      this.onUpdate.emit(updatedExpense);
    }
  }

  deleteRow(rowIdx: number) {
    this.onDelete.emit(this.editableExpenses[rowIdx].id);
  }

  addRow() {
    let newDescription = this.newData.description;
    let newAmount = this.newData.amount;
    let newDate = this.newData.date;

    if (newDescription === '' || newAmount === '' || newDate === '') {
      alert('Please fill in Date, Description and Amount.');
      return;
    }

    let newExpense = this.expensesService.mapToExpense(this.newData);
    this.onAdd.emit(newExpense);
  }

  clearNewData() {
    this.newData = {
      id: '',
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      categories: '',
    };
  }

  showSnackBar(description: string, action: string) {
    this.snackBar.open(description, action, {
      duration: 2000,
    });
  }

  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.addRow();
    }
  }
}
