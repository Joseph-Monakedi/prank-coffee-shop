import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CursorService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  x = signal(0);
  y = signal(0);
  isLocked = signal(false);

  constructor() {
    if (this.isBrowser) {
      this.x.set(window.innerWidth / 2);
      this.y.set(window.innerHeight / 2);
    }
  }

  updatePosition(dx: number, dy: number) {
    if (!this.isBrowser) return;
    this.x.update(x => Math.max(5, Math.min(window.innerWidth - 5, x + dx)));
    this.y.update(y => Math.max(5, Math.min(window.innerHeight - 5, y + dy)));
  }

  setPosition(x: number, y: number) {
    this.x.set(x);
    this.y.set(y);
  }

  setLocked(locked: boolean) {
    this.isLocked.set(locked);
  }
}
