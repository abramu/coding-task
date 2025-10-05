import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalState {
  public calculateLocally = signal(false);

  public setCalculateLocally(newValue: boolean) {
    this.calculateLocally.set(newValue);
  }
}
