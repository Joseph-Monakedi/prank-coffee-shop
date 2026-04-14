import { Component, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RepelDirective } from '../../shared/directives/repel.directive';

@Component({
  selector: 'app-donation-popup',
  imports: [ButtonModule, RepelDirective],
  template: `
    <div class="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center z-[30000]">
      <div class="bg-white text-black w-[440px] p-10 rounded-[28px] text-center shadow-[0_50px_100px_rgba(0,0,0,0.6)] border border-white/20">
        <h2 class="text-2xl font-bold mb-4">Support Our Partner Charity?</h2>
        <p class="text-sm leading-relaxed mb-8 opacity-80">Would you like to add a small R5000 contribution to support our unnamed global initiative? Your generosity makes a difference.</p>
        
        <div class="flex gap-3">
          <button pButton class="flex-1 p-4 font-bold bg-black text-white border-none" (click)="confirm.emit()">
            Confirm & Pay
          </button>
          <button pButton class="flex-1 p-4 font-bold bg-[#f0f0f0] text-[#666] border-none cancel-donation" appRepel [appRepel]="50" [shouldRepel]="true" [force]="3.5">
            No, Thanks
          </button>
        </div>
      </div>
    </div>
  `,
})
export class DonationPopupComponent {
  confirm = output<void>();
}
