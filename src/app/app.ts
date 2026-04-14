import { Component, HostListener, ElementRef, AfterViewInit, inject, PLATFORM_ID, ViewChildren, QueryList } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CursorService } from './services/cursor.service';
import { CartService } from './services/cart.service';
import { PrankService } from './services/prank.service';
import { MenuComponent } from './features/menu/menu.component';
import { CartComponent } from './features/cart/cart.component';
import { DiscountPopupComponent } from './features/popups/discount-popup.component';
import { DonationPopupComponent } from './features/popups/donation-popup.component';
import { PaymentPageComponent } from './features/payment/payment-page.component';
import { WelcomeOverlayComponent } from './features/welcome/welcome-overlay.component';

@Component({
  selector: 'app-root',
  imports: [
    MenuComponent, 
    CartComponent, 
    DiscountPopupComponent, 
    DonationPopupComponent, 
    PaymentPageComponent, 
    WelcomeOverlayComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  cursorService = inject(CursorService);
  cartService = inject(CartService);
  prankService = inject(PrankService);

  @ViewChildren(MenuComponent) menuComponents!: QueryList<MenuComponent>;

  ngAfterViewInit() {
    if (this.isBrowser) {
      // Repeatedly show discount popup
      setInterval(() => {
        if (!this.prankService.showDonationPopup() && !this.prankService.showPaymentPage() && Math.random() > 0.4) {
          this.prankService.showDiscount.set(true);
          setTimeout(() => this.prankService.showDiscount.set(false), 5000);
        }
      }, 12000);

      // Shuffle menu every 15 seconds
      setInterval(() => {
        if (!this.prankService.showPaymentPage()) {
          this.menuComponents.forEach(m => m.shuffle());
        }
      }, 15000);
    }
  }

  @HostListener('document:click')
  onDocumentClick() {
    if (!this.isBrowser) return;

    if (!this.cursorService.isLocked()) {
      this.el.nativeElement.requestPointerLock();
      this.cursorService.setLocked(true);
      return;
    }

    const element = document.elementFromPoint(this.cursorService.x(), this.cursorService.y()) as HTMLElement;
    if (element && element !== document.body) {
      element.click();
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isBrowser || !this.cursorService.isLocked()) return;

    let dx = event.movementX;
    let dy = event.movementY;

    if (this.prankService.isForceFieldActive()) {
      // Handle Teleportation for Checkout
      const checkoutBtn = document.querySelector('.checkout-btn');
      if (checkoutBtn) {
        const rect = checkoutBtn.getBoundingClientRect();
        if (this.prankService.handleCheckoutTeleport(rect)) {
          return;
        }
      }

      // Handle Repulsion from registered repellables
      for (const repellable of this.prankService.activeRepellables()) {
        const result = repellable.getRepulsion(dx, dy);
        if (result.repelled) {
          dx = result.dx;
          dy = result.dy;
          break; // Stop after first repulsion to avoid double-flipping
        }
      }
    }

    this.cursorService.updatePosition(dx, dy);
  }

  @HostListener('document:pointerlockchange')
  onPointerLockChange() {
    this.cursorService.setLocked(!!document.pointerLockElement);
  }

  resume() {
    if (this.isBrowser) {
      this.el.nativeElement.requestPointerLock();
    }
  }

  checkout() {
    this.prankService.showDonationPopup.set(true);
  }

  confirmDonation() {
    this.prankService.showDonationPopup.set(false);
    this.prankService.showPaymentPage.set(true);
  }

  restart() {
    this.prankService.reset();
    this.cartService.clear();
  }
}
