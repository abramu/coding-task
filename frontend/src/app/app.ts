import { Component, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
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
  globalSate = inject(GlobalState);
  currencySplitter = inject(CurrencySplitter);

  input = viewChild<ElementRef<HTMLInputElement>>('input');
  tableCurrent = viewChild<ElementRef<MatTable<TableRow>>>('tableCurrent');

  total = signal<number | null>(null);
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
    if (this.input()?.nativeElement.validity.valid && Number.isFinite(this.total())) {
      this.currencySplitter.split(this.total()!).subscribe({
        next: (result) => {
          this.currentSplit = Object.entries(result).map((entry) => {
            return {
              currencyValue: Number.parseFloat(entry[0]),
              amount: entry[1],
            };
          });
          this.tableCurrent()?.nativeElement.renderRows();
        },
        error: (err) => {
          alert(err.message);
        },
      });
    }
  }
}
