import { inject, Injectable } from '@angular/core';
import { DefaultService } from '../openapi';
import { map, Observable } from 'rxjs';
import { GlobalState } from './global-state';

export type SplitResult = { [key: string]: number };

@Injectable({ providedIn: 'root' })
export class CurrencySplitter {
  private globalState = inject(GlobalState);
  private api = inject(DefaultService);
  private currencyValues = this.api.apiValuesGet();

  /**
   * Optimally splits a provided sum of money into banknotes and coins.
   * The result is an object with the required banknote/coin values as keys.
   * The associated value is the required amount of that specific banknote/coin.
   *
   * @param total The sum of money to be split.
   * @returns An Observable of an object containing the amount of all banknotes/coins the total has been split into.
   */
  public split(total: number): Observable<SplitResult> {
    return this.globalState.calculateLocally()
      ? this.splitLocally(total)
      : this.splitRemotely(total);
  }

  private splitRemotely(total: number): Observable<SplitResult> {
    return this.api.apiSplitGet(total);
  }

  private splitLocally(total: number): Observable<SplitResult> {
    return this.currencyValues.pipe(
      map((values) => {
        const result: SplitResult = {};
        let remainder: number | undefined = undefined;

        for (const value of values) {
          const dividend: number = remainder ?? total;
          const quotient = Math.floor(dividend / value);

          if (quotient > 0) {
            result[value] = quotient;
            remainder = dividend % value;
          }
        }

        return result;
      })
    );
  }
}
