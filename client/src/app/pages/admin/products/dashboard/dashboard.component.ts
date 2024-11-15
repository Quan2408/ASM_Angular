import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../../types/Product';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  products: Product[] = [];
  productService = inject(ProductService);
  router = inject(Router);
  toast = inject(HotToastService);

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: () => alert('Error!'),
    });
  }

  handleDelete(id: string) {
    if (confirm('Delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.toast.success('Successfully');
          this.products = this.products.filter((product) => product._id !== id);
        },
        error: (error) => {
          console.error(error.message);
        },
      });
    }
  }
}
