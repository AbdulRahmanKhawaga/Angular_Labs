import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product';
import { DiscountPipe } from '../pipes/discount.pipe';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DiscountPipe, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading: boolean = true;
  error: string | null = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.fetchProductDetails(productId);
      }
    });
  }

  fetchProductDetails(id: string): void {
    this.loading = true;
    this.productService.getProductById(parseInt(id)).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
        this.quantity = 1; // Reset quantity when loading a new product
      },
      error: (err) => {
        this.error = 'Failed to load product details. Please try again later.';
        this.loading = false;
        console.error('Error fetching product details:', err);
      }
    });

    // Also subscribe to product updates to get real-time stock changes
    this.productService.products$.subscribe(products => {
      if (this.product && products.length > 0) {
        const updatedProduct = products.find(p => p.id === parseInt(id));
        if (updatedProduct) {
          this.product = updatedProduct;
          // Adjust quantity if it exceeds available stock
          if (this.quantity > updatedProduct.stock) {
            this.quantity = Math.max(1, updatedProduct.stock);
          }
        }
      }
    });
  }

  // Helper method to generate an array for star rating display
  get ratingStars(): number[] {
    return this.product ? Array(5).fill(0).map((_, i) => i + 1) : [];
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product && this.product.stock > 0 && this.quantity <= this.product.stock) {
      const success = this.cartService.addToCart(this.product, this.quantity);
      if (success) {
        // Reset quantity after successful add
        this.quantity = 1;
      } else {
        // Handle failure (could show a message)
        console.log('Failed to add to cart - not enough stock');
      }
    }
  }
}
