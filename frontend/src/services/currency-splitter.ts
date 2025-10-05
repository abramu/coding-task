import { inject, Injectable } from '@angular/core';
import { DefaultService } from '../openapi';
import { Observable } from 'rxjs';
import { GlobalState } from './global-state';
import { environment } from '../environments/environment';

export type SplitResult = { [key: string]: number };

@Injectable({ providedIn: 'root' })
export class CurrencySplitter {
  private globalState = inject(GlobalState);
  private api = inject(DefaultService);

  /**
   * Optimally splits a provided sum of money into banknotes and coins.
   * The result is an object with the required banknote/coin values as keys.
   * The associated value is the required amount of that specific banknote/coin.
   * The calculation happens either on the spot or at the backend, depending on globalState.calculateRemotely.
   *
   * @param total The sum of money to be split.
   * @returns An Observable of an object containing the amount of all banknotes/coins the total has been split into.
   */
  public split(total: number): Observable<SplitResult> {
    return this.globalState.calculateRemotely()
      ? this.splitRemotely(total)
      : new Observable((subscriber) => {
          subscriber.next(this.splitLocally(total));
          subscriber.complete();
        });
  }

  private splitRemotely(total: number): Observable<SplitResult> {
    return this.api.apiSplitGet(total);
  }

  private splitLocally(total: number): SplitResult {
    const result: SplitResult = {};
    let remainder: number | undefined = undefined;

    for (const currencyValue of environment.currencyValues) {
      const dividend: number = remainder ?? total;
      const quotient = Math.floor(dividend / currencyValue);

      if (quotient > 0) {
        result[currencyValue] = quotient;
        remainder = dividend % currencyValue;
      }
    }

    return result;
  }
}
