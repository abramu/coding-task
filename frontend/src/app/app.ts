import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GlobalState } from '../services/global-state';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, MatInputModule, MatTableModule, MatSlideToggleModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected currentResult = [{ currencyValue: 20, amount: 1 }];
  protected readonly columnsToDisplay = ['currencyValue', 'amount'];
  protected globalSate = inject(GlobalState);

  constructor() {
    effect(() => {
      console.log(`Calculate locally: ${this.globalSate.calculateLocally()}`);
    });
  }
}
