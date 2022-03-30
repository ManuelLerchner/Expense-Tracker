import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Expense } from 'src/app/models/Expense';
import { StoredExpense } from 'src/app/models/StoredExpense';
import { ExpensesService } from './../../services/expenses.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() expenses: Expense[] = [];
  @Input() editableExpenses: Expense[] = [];

  @Output() onDelete = new EventEmitter<number>();
  @Output() onUpdate = new EventEmitter<Expense>();
  @Output() onAdd = new EventEmitter<Expense>();

  constructor(private expensesService: ExpensesService) {}
  ngOnInit() {}

  newData: StoredExpense = {
    id: '',
    description: '',
    amount: '',
    date: '',
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

    this.onUpdate.emit(updatedExpense);
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
      date: '',
      categories: '',
    };
  }
}
