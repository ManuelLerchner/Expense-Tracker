import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Expense } from 'src/app/models/Expense';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    window.scrollTo(0, 5000);
  }

  clickedInsideTable = false;
  enableEditIdx = -1;

  @HostListener('click')
  clickInside() {
    this.clickedInsideTable = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.clickedInsideTable) {
      this.updateRow(this.enableEditIdx);
      this.enableEditIdx = -1;
    }
    this.clickedInsideTable = false;
  }

  enableEditMethod(e: any, i: number) {
    this.clickedInsideTable = true;
    this.enableEditIdx = i;
    console.log(i);
  }

  updateRow(i: number) {
    console.log('updateRow', i);

    if (i % 5 == 4) {
      let idx = Math.floor(i / 5);
      console.log(this.expenses[idx]);
      this.expenses[idx].categories = this.expenses[idx].categories
        .toString()
        .split(',');
    }
  }

  deleteRow(i: number) {
    this.expenses.splice(i, 1);
  }

  addNewData() {
    let newId = this.expenses.length + 1;
    let newDescription = this.newData.description;
    let newAmount = this.newData.amount;
    let newDate = this.newData.date;
    let newCategories = this.newData.categories;

    if (!(newDescription && newAmount && newDate && newCategories)) {
      alert('Please fill all the fields');
      return;
    }

    this.expenses.push({
      id: newId,
      description: newDescription,
      amount: newAmount,
      date: newDate,
      categories: newCategories,
    });

    this.newData = {};
  }

  newData: any = {};

  expenses: Expense[] = [
    {
      id: 1,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      amount: 100,
      date: new Date(),
      categories: ['Food', 'Transport'],
    },
    {
      id: 2,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      amount: 100,
      date: new Date(),
      categories: ['Food', 'Transport'],
    },
    {
      id: 3,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      amount: 100,
      date: new Date(),
      categories: ['Food', 'Transport'],
    },
    {
      id: 4,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      amount: 100,
      date: new Date(),
      categories: ['Food', 'Transport'],
    },
    {
      id: 4,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      amount: 100,
      date: new Date(),
      categories: ['Food', 'Transport'],
    },
    {
      id: 4,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      amount: 100,
      date: new Date(),
      categories: ['Food', 'Transport'],
    },
    {
      id: 4,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      amount: 100,
      date: new Date(),
      categories: ['Food', 'Transport'],
    },
    {
      id: 4,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      amount: 100,
      date: new Date(),
      categories: ['Food', 'Transport'],
    },
    {
      id: 4,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      amount: 100,
      date: new Date(),
      categories: ['Food', 'Transport'],
    },
    {
      id: 4,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      amount: 100,
      date: new Date(),
      categories: ['Food', 'Transport'],
    },
    {
      id: 4,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      amount: 100,
      date: new Date(),
      categories: ['Food', 'Transport'],
    },
    {
      id: 4,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      amount: 100,
      date: new Date(),
      categories: ['Food', 'Transport'],
    },
  ];
}
