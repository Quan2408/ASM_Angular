import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { Category } from '../../../../../types/Category';
import { CategoryService } from '../../../../services/category.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  categories: Category[] = [];
  categoryService = inject(CategoryService);
  productId!: string;
  productService = inject(ProductService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toast = inject(HotToastService);

  editForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    price: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    category: new FormControl(''),
    isShow: new FormControl(true),
    bidTime: new FormControl(''),
    startAt: new FormControl(''),
    endAt: new FormControl(''),
  });

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.productService.getProductDetail(this.productId).subscribe({
        next: (data) => {
          if (data.startAt) {
            const now = new Date(data.startAt);
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            const startAt = now.toISOString().slice(0, 16);
            this.editForm.patchValue({ ...data, startAt: startAt });
          } else {
            this.editForm.patchValue({ ...data });
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    });

    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }

  handleEdit() {
    if (!this.productId) return;

    console.log(this.editForm.value); // Kiểm tra dữ liệu form trước khi gửi
    console.log(this.productId);
    this.productService
      .updateProduct(this.productId, this.editForm.value)
      .subscribe({
        next: () => {
          this.toast.success('Successfully');
          this.router.navigateByUrl('/admin/products');
        },
        error: () => this.toast.error('Error'),
      });
  }
}
