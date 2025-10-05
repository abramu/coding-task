import { Component, effect, inject, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GlobalState } from '../services/global-state';
import { CurrencySplitter } from '../services/currency-splitter';

type TableRow = {
  currencyValue: number;
  amount: number;
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, MatInputModule, MatTableModule, MatSlideToggleModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  @ViewChild(MatTable)
  table!: MatTable<TableRow>;

  globalSate = inject(GlobalState);
  currencySplitter = inject(CurrencySplitter);

  total = signal<number | undefined>(undefined);
  currentSplit: TableRow[] = [];
  readonly columnsToDisplay: Array<keyof TableRow> = ['currencyValue', 'amount'];

  constructor() {
    effect(() => {
      this.total(); // Specify signal to watch
      this.updateTable();
    });
    effect(() => {
      this.globalSate.calculateRemotely(); // Specify signal to watch
      this.updateTable();
    });
  }

  private updateTable() {
    if (Number.isFinite(this.total())) {
      this.currencySplitter.split(this.total()!).subscribe({
        next: (result) => {
          this.currentSplit = Object.entries(result).map((entry) => {
            return {
              currencyValue: Number.parseFloat(entry[0]),
              amount: entry[1],
            };
          });
          this.table.renderRows();
        },
        error: (err) => {
          alert(err.message);
        },
      });
    }
  }
}
