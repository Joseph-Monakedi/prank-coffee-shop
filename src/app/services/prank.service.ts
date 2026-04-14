import { Injectable, signal, computed, inject } from '@angular/core';
import { CursorService } from './cursor.service';

export interface Repellable {
  getRepulsion(dx: number, dy: number): { dx: number, dy: number, repelled: boolean };
}

@Injectable({
  providedIn: 'root'
})
export class PrankService {
  private cursorService = inject(CursorService);

  showDiscount = signal(false);
  showDonationPopup = signal(false);
  showPaymentPage = signal(false);
  checkoutTeleportCount = signal(0);
  isForceFieldActive = signal(true);

  private repellables = signal<Repellable[]>([]);
  activeRepellables = computed(() => this.repellables());

  registerRepellable(repellable: Repellable) {
    this.repellables.update(list => [...list, repellable]);
  }

  unregisterRepellable(repellable: Repellable) {
    this.repellables.update(list => list.filter(r => r !== repellable));
  }

  isAnyPopupOpen = computed(() => 
    this.showDiscount() || 
    this.showDonationPopup() || 
    this.showPaymentPage() || 
    !this.cursorService.isLocked()
  );

  reset() {
    this.showDiscount.set(false);
    this.showDonationPopup.set(false);
    this.showPaymentPage.set(false);
    this.checkoutTeleportCount.set(0);
    this.isForceFieldActive.set(true);
  }

  handleCheckoutTeleport(rect: DOMRect) {
    if (this.checkoutTeleportCount() >= 3) return false;

    const dist = Math.hypot(
      this.cursorService.x() - (rect.left + rect.width / 2), 
      this.cursorService.y() - (rect.top + rect.height / 2)
    );

    if (dist < 60) {
      this.checkoutTeleportCount.update(n => n + 1);
      const count = this.checkoutTeleportCount();
      
      if (count === 1) {
        this.cursorService.setPosition(window.innerWidth - 50, 50);
      } else if (count === 2) {
        this.cursorService.setPosition(50, 50);
      } else if (count === 3) {
        this.cursorService.setPosition(50, window.innerHeight - 50);
      }
      return true;
    }
    return false;
  }
}
