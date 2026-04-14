import { ChangeDetectionStrategy, Component, output, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <div class="fixed inset-0 bg-bg flex items-center justify-center z-[60000]">
      <div class="bg-surface w-[450px] p-12 rounded-[30px] text-center border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
        <div class="text-6xl mb-5">☕</div>
        <h2 class="text-2xl font-bold mb-2">Payment Successful</h2>
        <p class="text-text-dim text-sm mb-8">Your order is being prepared by our master baristas.</p>
        
        <div class="my-8 bg-black/20 p-5 rounded-2xl">
          <div class="flex justify-between text-sm text-text-dim mb-2">
            <span>Order Total</span>
            <span>R{{ orderTotal() }}</span>
          </div>
          <div class="flex justify-between text-sm text-error font-semibold mb-2">
            <span>Donation</span>
            <span>R5000</span>
          </div>
          <div class="flex justify-between mt-4 pt-4 border-t border-white/10 text-xl font-bold text-accent">
            <span>Total Charged</span>
            <span>R{{ orderTotal() + 5000 }}</span>
          </div>
        </div>
        
        <p class="text-xs text-text-dim leading-relaxed mb-8">
          Thank you for your generous R5000 donation. A receipt has been sent to your encrypted terminal.
        </p>
        
        <button pButton class="w-full p-4 font-bold bg-accent text-black border-none" (click)="restart.emit()">
          Return to Menu
        </button>
      </div>
    </div>
  `,
})
export class PaymentPageComponent {
  orderTotal = input.required<number>();
  restart = output<void>();
}
