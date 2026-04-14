import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { INGREDIENTS, Ingredient } from '../../config/ingredients.config';
import { CartService } from '../../services/cart.service';
import { RepelDirective } from '../../shared/directives/repel.directive';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RepelDirective, ButtonModule],
  template: `
    <div class="p-10 overflow-y-auto h-full">
      <div class="mb-8 border-b border-accent-soft pb-2">
        <h2 class="text-accent uppercase tracking-widest text-sm font-bold">Coffee & Additives</h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        @for (ingredient of ingredients(); track ingredient.name) {
          <div class="bg-surface border border-white/5 p-5 rounded-xl flex justify-between items-center transition-all hover:border-accent hover:bg-white/2">
            <div class="flex flex-col gap-1">
              <span class="font-semibold text-base">{{ ingredient.name }}</span>
              <span class="text-xs text-text-dim">{{ ingredient.description }}</span>
              <span class="font-mono font-semibold text-accent mt-1">R{{ ingredient.price }}</span>
            </div>
            
            <button 
              pButton 
              icon="pi pi-plus" 
              class="p-button-rounded p-button-text text-accent"
              [appRepel]="ingredient.shouldRepel ? 5 : 0"
              [shouldRepel]="ingredient.shouldRepel"
              [isMenuBtn]="true"
              (click)="addToCart(ingredient)">
            </button>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  private cartService = inject(CartService);
  ingredients = signal<Ingredient[]>(INGREDIENTS);

  addToCart(ing: Ingredient) {
    this.cartService.addItem({ name: ing.name, price: ing.price });
  }

  shuffle() {
    this.ingredients.update(items => {
      const shuffled = [...items];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  }
}
