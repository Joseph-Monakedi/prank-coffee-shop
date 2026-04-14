import { Directive, ElementRef, inject, input, OnInit, OnDestroy } from '@angular/core';
import { CursorService } from '../../services/cursor.service';
import { PrankService, Repellable } from '../../services/prank.service';

@Directive({
  selector: '[appRepel]',
  standalone: true
})
export class RepelDirective implements Repellable, OnInit, OnDestroy {
  private el = inject(ElementRef);
  private cursorService = inject(CursorService);
  private prankService = inject(PrankService);

  appRepel = input<number | string>(30);
  shouldRepel = input<boolean | string>(false);
  force = input<number | string>(1);
  isMenuBtn = input<boolean | string>(false);

  ngOnInit() {
    this.prankService.registerRepellable(this);
  }

  ngOnDestroy() {
    this.prankService.unregisterRepellable(this);
  }

  getRepulsion(currentDx: number, currentDy: number): { dx: number, dy: number, repelled: boolean } {
    if (!this.prankService.isForceFieldActive()) return { dx: currentDx, dy: currentDy, repelled: false };
    if (!this.shouldRepel()) return { dx: currentDx, dy: currentDy, repelled: false };

    const isMenu = typeof this.isMenuBtn() === 'string' ? true : this.isMenuBtn();

    // Disable menu item repulsion if a popup is open
    if (isMenu && this.prankService.isAnyPopupOpen()) {
      return { dx: currentDx, dy: currentDy, repelled: false };
    }

    const rect = this.el.nativeElement.getBoundingClientRect();
    const margin = typeof this.appRepel() === 'string' ? 40 : (this.appRepel() as number);
    const forceValue = typeof this.force() === 'string' ? 1.8 : (this.force() as number);

    const x = this.cursorService.x();
    const y = this.cursorService.y();

    // Check if cursor is within the rect + margin
    const isInside = x > rect.left - margin && 
                     x < rect.right + margin && 
                     y > rect.top - margin && 
                     y < rect.bottom + margin;

    if (isInside) {
      const dx = currentDx * -forceValue;
      let dy = currentDy * -forceValue;
      
      // Add some jitter
      dy += Math.sin(Date.now() / 80) * 4;
      
      return { dx, dy, repelled: true };
    }

    return { dx: currentDx, dy: currentDy, repelled: false };
  }
}
