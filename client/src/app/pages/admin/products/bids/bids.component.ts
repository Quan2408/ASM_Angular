import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { BidsService } from '../../../../services/bids.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Product } from '../../../../../types/Product';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-bids',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.css'],
})
export class ProductBidsComponent implements OnInit {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  bidService = inject(BidsService);
  fb = inject(FormBuilder);
  toast = inject(HotToastService);

  product!: Product;
  productId!: string;
  bidForm!: FormGroup;
  config = {
    /* Countdown config */
  };

  ngOnInit() {
    this.bidForm = this.fb.group({
      price: [null],
    });

    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.getProductDetail(this.productId);
    });
  }

  getProductDetail(id: string) {
    this.productService.getProductDetail(id).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  handleSetBidWin(id: string) {
    this.bidService.updateBid(id, true).subscribe({
      next: (data) => {
        this.toast.success('Bid Updated Successfully');
        this.getProductDetail(this.productId);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  handleSubmit() {
    const bidPrice = this.bidForm.value.price;
    // Gửi giá bid mới đến server hoặc xử lý logic khác
    console.log('Bid Price:', bidPrice);
  }
}
