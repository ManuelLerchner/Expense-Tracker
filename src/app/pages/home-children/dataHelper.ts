import { Expense } from 'src/app/models/Expense';
import { ExpensesService } from 'src/app/services/expenses.service';

export async function loadExpenses(expensesService: ExpensesService) {
  try {
    let expenses = await expensesService
      .getExpensesForCurrentUser()
      .toPromise();

    let sortedExpenses = expenses.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });

    let editableExpenses = expenses.map((expense) => {
      return { ...expense, editable: false };
    });

    return { sortedExpenses, editableExpenses };
  } catch (e: any) {
    console.log(e.error);
  }

  return { sortedExpenses: [], editableExpenses: [] };
}

export function loadAllExpenses(sortedData: Expense[], sortedLabels: string[]) {
  let totalData = sortedData.map((expense) => {
    return expense.amount;
  });

  let lineChartData_total = [
    {
      data: totalData,
      label: 'Expenses',
    },
  ];

  let lineChartLabels_total = sortedLabels;

  return { lineChartData_total, lineChartLabels_total };
}

export function loadAccumulativeExpenses(
  sortedData: Expense[],
  sortedLabels: string[]
) {
  let accumulativeData = sortedData
    .map((expense) => {
      return expense.amount;
    })
    .map(
      (
        (sum: number) => (value: number) =>
          (sum += value)
      )(0)
    );

  let lineChartData_accumulative = [
    {
      data: accumulativeData,
      label: 'Accumulative Expenses',
    },
  ];

  let totalSpending = accumulativeData[accumulativeData.length - 1] || 0;

  let lineChartLabels_accumulative = sortedLabels;

  return {
    lineChartData_accumulative,
    totalSpending,
    lineChartLabels_accumulative,
  };
}

export function loadCategories(sortedData: Expense[]) {
  let allCategories = sortedData.reduce((accum: any, curr: any) => {
    if (curr.categories.length > 0) {
      return [...accum, ...curr.categories];
    } else {
      return [...accum, 'No category'];
    }
  }, []);

  let categoriesCount = allCategories.reduce((accum: any, curr: any) => {
    if (accum[curr]) {
      accum[curr]++;
    } else {
      accum[curr] = 1;
    }
    return accum;
  }, {});

  let doughnutChartLabels = Object.keys(categoriesCount);

  let doughnutChartData = [
    {
      data: Object.values(categoriesCount),
      label: 'Categories',
    },
  ];

  return { doughnutChartLabels, doughnutChartData };
}

export function calculateMonthlySpending(sortedExpenses: Expense[]) {
  let last31Days = sortedExpenses.filter((expense) => {
    return (
      expense.date.getTime() >= new Date().setDate(new Date().getDate() - 31)
    );
  });

  let previous31Days = sortedExpenses.filter((expense) => {
    return (
      expense.date.getTime() < new Date().setDate(new Date().getDate() - 31) &&
      expense.date.getTime() >= new Date().setDate(new Date().getDate() - 62)
    );
  });

  let thisMonthSpending = last31Days.reduce((accum: number, curr: any) => {
    return accum + curr.amount;
  }, 0);

  let previousMonthlySpending = previous31Days.reduce(
    (accum: number, curr: any) => {
      return accum + curr.amount;
    },
    0
  );

  let changePercentage = thisMonthSpending / previousMonthlySpending;

  let monthlySpending = thisMonthSpending;
  let monthlyChange = changePercentage;

  return { monthlySpending, monthlyChange };
}

export function biggestSingleSpending(sortedExpenses: Expense[]) {
  let biggestSingleSpending: any = {};
  try {
    biggestSingleSpending = sortedExpenses.reduce((accum: any, curr: any) => {
      return accum.amount > curr.amount ? accum : curr;
    });
  } catch (e) {}

  let biggestSpendingDescription =
    'The biggest single expense is ' +
    (biggestSingleSpending.description || '-') +
    ' it was bought on ' +
    (biggestSingleSpending.description
      ? biggestSingleSpending.date.toLocaleDateString()
      : '-');
  let biggestSpendingAmount = biggestSingleSpending.amount | 0;

  return { biggestSpendingDescription, biggestSpendingAmount };
}

export function biggestCategorySpendings(sortedExpenses: Expense[]) {
  let biggestCategory: any = {};

  sortedExpenses.forEach((expense) => {
    expense.categories.forEach((category) => {
      if (biggestCategory[category]) {
        biggestCategory[category] += expense.amount;
      } else {
        biggestCategory[category] = expense.amount;
      }
    });

    if (expense.categories.length === 0) {
      if (biggestCategory['Other']) {
        biggestCategory['Other'] += expense.amount;
      } else {
        biggestCategory['Other'] = expense.amount;
      }
    }
  });

  let bigestCategoryName;
  try {
    bigestCategoryName = Object.entries(biggestCategory).reduce(
      (accum: any, curr: any) => {
        return accum[1] > curr[1] ? accum : curr;
      }
    )[0];
  } catch (err) {
    let biggestCategoryName = '-';
    let biggestCategoryShare = 0;

    return { biggestCategoryName, biggestCategoryShare };
  }

  let biggestCategoryName = bigestCategoryName;
  let biggestCategoryShare = biggestCategory[bigestCategoryName];

  return { biggestCategoryName, biggestCategoryShare };
}
