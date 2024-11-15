import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductForm } from '../../types/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  token = localStorage.getItem('token');
  headers = { Authorization: `Bearer${this.token}` };
  apiUrl = 'http://localhost:8080/api/products';
  http = inject(HttpClient);

  getAll() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductDetail(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  deleteProduct(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  createProduct(data: ProductForm) {
    return this.http.post(this.apiUrl, data);
  }

  updateProduct(id: string, data: ProductForm) {
    console.log(data);
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
