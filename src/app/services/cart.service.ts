import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = signal<CartItem[]>([]);
  totalPrice = computed(() => this.items().reduce((acc, item) => acc + item.price, 0));

  addItem(item: CartItem) {
    this.items.update(current => [...current, item]);
  }

  clear() {
    this.items.set([]);
  }
}
