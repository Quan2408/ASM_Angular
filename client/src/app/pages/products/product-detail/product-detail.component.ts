import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../types/Product';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { BidsService } from '../../../services/bids.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, DatePipe, CountdownComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  bidService = inject(BidsService);
  product!: Product | undefined;
  config: CountdownConfig = {
    leftTime: 0,
  };
  bidForm: FormGroup = new FormGroup({
    price: new FormControl('', [Validators.required]),
  });
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  toast = inject(HotToastService);
  router = inject(Router);

  productId!: string;
  getProductDetail(id: string) {
    this.productService.getProductDetail(id).subscribe({
      next: (data) => {
        this.product = data;
        const stepTimeBid = Math.floor(
          (new Date(data.endAt).getTime() - new Date().getTime()) / 1000
        );
        if (stepTimeBid <= 0) {
          this.bidForm.disable();
        } else {
          this.config = {
            leftTime: stepTimeBid,
          };
          this.bidForm.enable();
        }
        // console.log(stepTimeBid);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.getProductDetail(this.productId);
    });
  }

  handleSubmit() {
    if (!this.product) return;
    if (this.config.leftTime === 0) {
      this.toast.error('Time out');
    }
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.bidService
      .createBid({
        product: this.product._id,
        bids: this.product.bids.map((bid) => bid._id),
        user: userId,
        price: this.bidForm.value.price,
        bidPriceMax: this.product.bidPriceMax,
      })
      .subscribe({
        next: () => {
          this.getProductDetail(this.productId);
          this.bidForm.controls['price'].reset();
        },
        error: (error) => {
          console.error('Error creat bid:', error);
          this.toast.error('Error' + error.message);
        },
      });
  }
}
