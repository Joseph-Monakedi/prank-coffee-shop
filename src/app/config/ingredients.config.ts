export interface Ingredient {
  name: string;
  price: number;
  category: string;
  description: string;
  shouldRepel: boolean;
}

export const INGREDIENTS: Ingredient[] = [
  { name: 'Double Espresso', price: 32, category: 'Coffee', description: 'Rich and intense', shouldRepel: false },
  { name: 'Oat Milk', price: 12, category: 'Add-on', description: 'Creamy plant-based', shouldRepel: false },
  { name: 'Vanilla Syrup', price: 8, category: 'Flavor', description: 'Madagascar bean', shouldRepel: false },
  { name: 'Salted Caramel', price: 10, category: 'Flavor', description: 'Sweet and salty', shouldRepel: false },
  { name: 'Whipped Cream', price: 15, category: 'Topping', description: 'Fluffy clouds', shouldRepel: false },
  { name: 'Extra Shot', price: 18, category: 'Coffee', description: 'For the brave', shouldRepel: false },
  { name: 'Honey Drizzle', price: 6, category: 'Sweetener', description: 'Organic nectar', shouldRepel: false },
  { name: 'Cinnamon Dust', price: 4, category: 'Topping', description: 'Warm spice', shouldRepel: false },
  { name: 'Gold Flakes', price: 0, category: 'Premium', description: 'Pure 24k luxury', shouldRepel: true },
  { name: 'Secret Spice', price: 0, category: 'Mystery', description: 'Ancient recipe', shouldRepel: true }
];
