import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalState {
  public calculateRemotely = signal(false);
}
