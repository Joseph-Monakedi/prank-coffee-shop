import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RepelDirective } from '../../shared/directives/repel.directive';

@Component({
  selector: 'app-discount-popup',
  standalone: true,
  imports: [ButtonModule, RepelDirective],
  template: `
    <div class="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center z-30000">
      <div class="bg-white text-black w-110 p-10 rounded-[28px] text-center shadow-[0_50px_100px_rgba(0,0,0,0.6)] border border-white/20">
        <div class="bg-black text-accent text-[10px] font-extrabold px-3 py-1 rounded-full inline-block mb-4">LIMITED TIME</div>
        <h2 class="text-2xl font-bold mb-4">100% OFF DISCOUNT!</h2>
        <p class="text-sm leading-relaxed mb-8 opacity-80">Congratulations! You've been selected for a free order. Claim your discount now before it expires.</p>
        
        <div class="flex gap-3">
          <button pButton class="flex-1 p-4 font-bold bg-accent text-black border-none repel" appRepel [shouldRepel]="true" (click)="dismiss.emit()">
            Claim Now
          </button>
          <button pButton class="flex-1 p-4 font-bold p-button-text text-black" (click)="dismiss.emit()">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  `,
})
export class DiscountPopupComponent {
  dismiss = output<void>();
}
