import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, startWith, withLatestFrom } from 'rxjs/operators';
import { Expense } from 'src/app/models/Expense';
import { ExpensesService } from 'src/app/services/expenses.service';
import { loadExpenses } from '../dataHelper';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss', '../shared.style.scss'],
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'position',
    'date',
    'description',
    'amount',
    'categories',
  ];
  dataSource = new MatTableDataSource();

  formGroup!: FormGroup;
  filteredExpenses$: Expense[] = [];
  modifiedExpenses: any[] = [];

  constructor(
    private expensesService: ExpensesService,
    formBuilder: FormBuilder
  ) {
    this.formGroup = formBuilder.group({ filter: [''] });

    this.formGroup.get('filter')?.valueChanges.subscribe((value) => {
      this.filteredExpenses$ = this.modifiedExpenses.filter((expense: any) => {
        return (
          expense.description.toLowerCase().includes(value.toLowerCase()) ||
          expense.categories
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          expense.amount
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          expense.date
            .toDateString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          expense.id.toString().toLowerCase().includes(value.toLowerCase())
        );
      });

      this.dataSource.data = this.filteredExpenses$;
    });
  }

  @ViewChild(MatSort) sort!: MatSort;

  updateData() {
    loadExpenses(this.expensesService).then((data) => {
      let expenses = data['sortedExpenses'].map((expense, i) => {
        return {
          ...expense,
          id: i,
          displayDate: expense.date.toDateString(),
          categories: expense.categories.join(', '),
        };
      });

      this.modifiedExpenses = expenses;
      this.dataSource.data = expenses;
    });
  }

  ngOnInit() {
    this.updateData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'position':
          return compare(a.id, b.id, isAsc);
        case 'date':
          return compare(a.date.valueOf(), b.date.valueOf(), isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        case 'amount':
          return compare(a.amount, b.amount, isAsc);
        case 'categories':
          return compare(
            a.categories.toString(),
            b.categories.toString(),
            isAsc
          );
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
