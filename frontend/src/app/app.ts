import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatInputModule, MatTableModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected currentResult = [{ currencyValue: 20, amount: 1 }];
  protected readonly columnsToDisplay = ['currencyValue', 'amount'];
}
