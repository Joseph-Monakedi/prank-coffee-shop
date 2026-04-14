import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <div class="w-[350px] p-10 bg-black/20 border-l border-white/5 h-full">
      <div class="bg-surface rounded-2xl h-full flex flex-col border border-white/10 overflow-hidden">
        <h3 class="p-5 m-0 text-base border-b border-white/5 font-semibold">Your Order</h3>
        
        <div class="flex-1 p-5 overflow-y-auto flex flex-col gap-3">
          @if (cartService.items().length === 0) {
            <p class="text-text-dim text-sm text-center mt-10">Your cart is empty.</p>
          } @else {
            @for (item of cartService.items(); track $index) {
              <div class="flex justify-between text-sm pb-2 border-b border-dashed border-white/10">
                <span>{{ item.name }}</span>
                <span>R{{ item.price }}</span>
              </div>
            }
          }
        </div>
        
        <div class="p-5 bg-black/20 flex flex-col gap-4">
          <div class="flex justify-between font-bold text-lg text-accent">
            <span>Total</span>
            <span>R{{ cartService.totalPrice() }}</span>
          </div>
          
          <button 
            pButton 
            class="checkout-btn w-full p-4 font-bold uppercase tracking-wider"
            [disabled]="cartService.items().length === 0"
            (click)="checkout.emit()">
            Checkout
          </button>
          
          <button 
            pButton 
            class="p-button-text text-text-dim text-xs"
            [disabled]="cartService.items().length === 0"
            (click)="cartService.clear()">
            Clear
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host ::ng-deep .checkout-btn {
      background: var(--color-accent) !important;
      color: #000 !important;
      border: none !important;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  cartService = inject(CartService);
  checkout = output<void>();
}
