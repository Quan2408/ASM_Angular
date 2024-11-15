import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../types/Product';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  products: Product[] = [];
  productService = inject(ProductService);

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: () => alert('Error!'),
    });
  }
}
