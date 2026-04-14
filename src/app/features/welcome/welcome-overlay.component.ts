import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-welcome-overlay',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <div class="fixed inset-0 bg-black flex items-center justify-center z-[50000]">
      <div class="bg-white text-black p-12 rounded-[32px] text-center w-[400px] shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
        <div class="w-10 h-10 border-3 border-black/10 border-t-black rounded-full animate-spin mx-auto mb-5"></div>
        <h2 class="text-2xl font-bold mb-2">Welcome to Artisan Brew</h2>
        <p class="text-gray-500 mb-8">Click here to build your perfect coffee</p>
        <button pButton class="bg-black text-white px-8 py-3 rounded-xl font-bold text-lg border-none" (click)="started.emit()">
          Get Started
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeOverlayComponent {
  started = output<void>();
}
