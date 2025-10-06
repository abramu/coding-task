import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GlobalState } from '../services/global-state';
import { CurrencySplitter, SplitResult } from '../services/currency-splitter';

type TableRow = {
  currencyValue: number;
  amount: number;
};

type DeltaTableRow = {
  currencyValue: number;
  delta: string;
};

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  globalState = inject(GlobalState);
  currencySplitter = inject(CurrencySplitter);

  input = viewChild<ElementRef<HTMLInputElement>>('input');
  table = viewChild<MatTable<TableRow>>('table');
  deltaTable = viewChild<MatTable<TableRow>>('deltaTable');

  total = signal<number | null>(null);
  previousTotal = signal<number | null>(null);
  cachedTotal: number | null = null;
  cachedSplitResult: SplitResult = {};
  firstCalculationDone = false;
  tableRows: TableRow[] = [];
  deltaTableRows: DeltaTableRow[] = [];

  readonly columnsToDisplay: Array<keyof TableRow> = ['currencyValue', 'amount'];
  readonly deltaColumnsToDisplay: Array<keyof DeltaTableRow> = ['currencyValue', 'delta'];

  calculate() {
    if (this.input()?.nativeElement.validity.valid && Number.isFinite(this.total())) {
      this.currencySplitter.split(this.total()!).subscribe({
        next: (result) => {
          this.tableRows = Object.entries(result)
            .map((entry) => {
              return {
                currencyValue: Number.parseFloat(entry[0]),
                amount: entry[1],
              };
            })
            .sort((a, b) => b.currencyValue - a.currencyValue); // Descending order
          this.table()?.renderRows();

          if (this.firstCalculationDone) {
            this.previousTotal.set(this.cachedTotal);

            const cachedToCurrent = Object.entries(this.cachedSplitResult).map((entry) => {
              // Compare the old amount of a banknote/coin to the new amount (not used means 0)
              const delta = (result[entry[0]] ?? 0) - entry[1];
              return {
                currencyValue: Number.parseFloat(entry[0]),
                delta: delta > 0 ? '+' + delta.toString() : delta.toString(),
              };
            });
            // Reversed comparison
            const currentToCached = Object.entries(result)
              // Only compare values that haven't already been compared
              .filter((entry) => !(entry[0] in this.cachedSplitResult))
              .map((entry) => {
                const delta = entry[1] - (this.cachedSplitResult[entry[0]] ?? 0);
                return {
                  currencyValue: Number.parseFloat(entry[0]),
                  delta: delta > 0 ? '+' + delta.toString() : delta.toString(),
                };
              });

            this.deltaTableRows = [...cachedToCurrent, ...currentToCached].sort(
              (a, b) => b.currencyValue - a.currencyValue
            );
            this.deltaTable()?.renderRows();
          } else {
            this.firstCalculationDone = true;
          }

          this.cachedTotal = this.total();
          this.cachedSplitResult = result;
        },
        error: (err) => {
          alert(err.message);
        },
      });
    }
  }
}
