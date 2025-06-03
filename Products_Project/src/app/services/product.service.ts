import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();
  private productsLoaded = false;

  constructor(private http: HttpClient) {}

  loadProducts(): Observable<Product[]> {
    if (this.productsLoaded) {
      return this.products$;
    }

    return this.http.get<{products: Product[]}>('https://dummyjson.com/products').pipe(
      map(response => response.products),
      tap(products => {
        this.productsSubject.next(products);
        this.productsLoaded = true;
      })
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`https://dummyjson.com/products/${id}`);
  }

  updateProductStock(productId: number, newStock: number): void {
    const currentProducts = this.productsSubject.value;
    const updatedProducts = currentProducts.map(product => {
      if (product.id === productId) {
        return { ...product, stock: newStock };
      }
      return product;
    });

    this.productsSubject.next(updatedProducts);
  }

  decrementStock(productId: number, quantity: number = 1): boolean {
    const currentProducts = this.productsSubject.value;
    const product = currentProducts.find(p => p.id === productId);

    if (!product || product.stock < quantity) {
      return false; 
    }

    const newStock = product.stock - quantity;
    this.updateProductStock(productId, newStock);
    return true;
  }

  incrementStock(productId: number, quantity: number = 1): void {
    const currentProducts = this.productsSubject.value;
    const product = currentProducts.find(p => p.id === productId);

    if (product) {
      const newStock = product.stock + quantity;
      this.updateProductStock(productId, newStock);
    }
  }
}
