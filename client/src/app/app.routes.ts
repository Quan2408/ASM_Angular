import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminGuard } from './admin.guard';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { DashboardComponent } from './pages/admin/products/dashboard/dashboard.component';
import { ProductAddComponent } from './pages/admin/products/product-add/product-add.component';
import { ProductEditComponent } from './pages/admin/products/product-edit/product-edit.component';
import { ProductBidsComponent } from './pages/admin/products/bids/bids.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'products', component: DashboardComponent },
      { path: 'products/product-add', component: ProductAddComponent },
      { path: 'products/product-edit/:id', component: ProductEditComponent },
      { path: 'products/bids/:id', component: ProductBidsComponent },
    ],
  },
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: '', component: HomepageComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
];
