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
  @Output() onAdd = new EventEmitter<any>();

  constructor(
    private router: Router,
    private expensesService: ExpensesService
  ) {}
  ngOnInit() {}

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
    let newExpense = this.expensesService.mapToExpense(
      this.editableExpenses[rowIdx]
    );

    this.onUpdate.emit(newExpense);
  }

  deleteRow(i: number) {
    this.onDelete.emit(i);
  }

  addRow() {
    let newDescription = this.newData.description;
    let newAmount = this.newData.amount;
    let newDate = this.newData.date;
    let newCategories = this.newData.categories;

    if (!(newDescription && newAmount && newDate && newCategories)) {
      alert('Please fill all the fields');
      return;
    }

    this.onAdd.emit(this.newData);

    this.newData = {};
  }

  newData: any = {};
}
