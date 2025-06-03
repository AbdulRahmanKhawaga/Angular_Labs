import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from './product.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private cartCountSubject = new BehaviorSubject<number>(0);

  cart$ = this.cartSubject.asObservable();
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private productService: ProductService) {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.updateCart();
    }
  }

  addToCart(product: Product, quantity: number = 1): boolean {
    if (product.stock === 0 || product.stock < quantity) return false;
    const success = this.productService.decrementStock(product.id, quantity);
    if (!success) return false;

    const existingItem = this.cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.product = { ...product, stock: product.stock - quantity };
    } else {
      this.cartItems.push({
        product: { ...product, stock: product.stock - quantity },
        quantity
      });
    }

    this.updateCart();
    return true;
  }

  removeFromCart(productId: number): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      this.productService.incrementStock(productId, item.quantity);
      this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
      this.updateCart();
    }
  }

  updateQuantity(productId: number, newQuantity: number): boolean {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (!item) return false;

    if (newQuantity <= 0) {
      this.removeFromCart(productId);
      return true;
    }

    const quantityDiff = newQuantity - item.quantity;

    if (quantityDiff > 0) {
      const success = this.productService.decrementStock(productId, quantityDiff);
      if (!success) return false;
    } else if (quantityDiff < 0) {
      this.productService.incrementStock(productId, Math.abs(quantityDiff));
    }

    item.quantity = newQuantity;
    const currentProducts = this.productService.products$;
    currentProducts.subscribe(products => {
      const updatedProduct = products.find(p => p.id === productId);
      if (updatedProduct) {
        item.product = { ...updatedProduct };
      }
    }).unsubscribe();

    this.updateCart();
    return true;
  }

  clearCart(): void {
    this.cartItems.forEach(item => {
      this.productService.incrementStock(item.product.id, item.quantity);
    });

    this.cartItems = [];
    this.updateCart();
  }

  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => {
      const price = item.product.discountPercentage > 0
        ? item.product.price * (1 - item.product.discountPercentage / 100)
        : item.product.price;
      return total + (price * item.quantity);
    }, 0);
  }

  getCartCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  private updateCart(): void {
    this.cartSubject.next([...this.cartItems]);
    this.cartCountSubject.next(this.getCartCount());
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
