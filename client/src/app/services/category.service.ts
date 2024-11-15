import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../../types/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl = 'http://localhost:8080/api/categories';
  http = inject(HttpClient);

  getAllCategories() {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
