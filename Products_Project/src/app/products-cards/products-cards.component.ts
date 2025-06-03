import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../models/product';
import { DiscountPipe } from '../pipes/discount.pipe';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products-cards',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, DiscountPipe],
  templateUrl: './products-cards.component.html',
  styleUrl: './products-cards.component.css'
})
export class ProductsCardsComponent implements OnInit {
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  currentPage = 1;
  itemsPerPage = 8;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.loadProducts().subscribe(products => {
      this.products = products;
      this.setPage(1);
    });

    this.productService.products$.subscribe(products => {
      if (products.length > 0) {
        this.products = products;
        this.updatePaginatedProducts();
      }
    });
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  private updatePaginatedProducts(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(start, end);
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.products.length / this.itemsPerPage))
      .fill(0)
      .map((_, i) => i + 1);
  }

  addToCart(product: Product): void {
    if (product.stock > 0) {
      const success = this.cartService.addToCart(product);
      if (!success) {
        console.log('Failed to add to cart - not enough stock');
      }
    }
  }
}
