import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/Expense';
import { ExpensesService } from 'src/app/services/expenses.service';
import { loadExpenses } from '../dataHelper';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss', '../shared.style.scss'],
})
export class GalleryComponent implements OnInit {
  constructor(private expenseService: ExpensesService) {}

  expenses: Expense[] = [];

  ngOnInit() {
    this.updateData();
  }

  updateData() {
    loadExpenses(this.expenseService).then((data) => {
      this.expenses = data['sortedExpenses'];
    });
  }
}
