import { Injectable, signal } from '@angular/core';

export type SplitResultSource = 'backend' | 'frontend';

@Injectable({ providedIn: 'root' })
export class GlobalState {
  public splitResultSource = signal<SplitResultSource>('backend');

  public setSplitResultSource(newValue: SplitResultSource) {
    this.splitResultSource.set(newValue);
  }
}
