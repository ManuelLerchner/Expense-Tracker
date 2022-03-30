import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Expense } from '../models/Expense';
import { StoredExpense } from '../models/StoredExpense';
import { User } from '../models/User';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  getExpensesForCurrentUser() {
    let currentUser: User = this.accountService.userValue;

    let queryParams = new HttpParams({
      fromObject: {
        authToken: currentUser.authToken,
        email: currentUser.email,
      },
    });

    return this.http
      .get<StoredExpense[]>(`${environment.apiUrl}/expenses`, {
        params: queryParams,
      })
      .pipe(
        map((expeses: StoredExpense[]) => {
          return expeses.map(this.mapToExpense);
        })
      );
  }

  updateExpense(toUpdate: StoredExpense) {
    let currentUser: User = this.accountService.userValue;

    return this.http.put(`${environment.apiUrl}/expenses/update`, {
      user: currentUser,
      expenseToUpdate: toUpdate,
    });
  }

  mapToExpense(expense: any): Expense {
    return {
      id: parseInt(expense.id),
      amount: parseFloat(expense.amount),
      description: expense.description.toString(),
      categories: expense.categories
        .toString()
        .split(',')
        .map((string: string) => string.trim())
        .filter((c: string) => c),
      date: new Date(expense.date),
    };
  }

  convertToStoredExpense(storedExpense: Expense): StoredExpense {
    return {
      id: storedExpense.id.toString(),
      amount: storedExpense.amount.toString(),
      description: storedExpense.description,
      categories: storedExpense.categories.filter((c) => c).join(', '),
      date: new Date(storedExpense.date).toISOString().split('T')[0],
    };
  }
}
