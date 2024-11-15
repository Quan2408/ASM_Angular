import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { Category } from '../../../../../types/Category';
import { CategoryService } from '../../../../services/category.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent {
  categories: Category[] = [];
  categoryService = inject(CategoryService);
  productService = inject(ProductService);
  router = inject(Router);
  toast = inject(HotToastService);
  addForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    price: new FormControl(0, [Validators.required]),
    description: new FormControl(''),
    category: new FormControl(''),
    isShow: new FormControl(true),
    startAt: new FormControl(''),
    endAt: new FormControl(''),
    bidTime: new FormControl(''),
  });

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        // show error
        console.error(error.message);
      },
    });
  }

  handleSubmit() {
    console.log(this.addForm.value); // Kiểm tra dữ liệu gửi đi

    this.productService.createProduct({ ...this.addForm.value }).subscribe({
      next: () => {
        console.log('a');
        this.toast.success('Successfully');
        setTimeout(() => this.router.navigate(['/admin/products']));
      },
      error: () => this.toast.error('Error!'),
    });
  }
}
