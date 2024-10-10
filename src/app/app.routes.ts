import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },

      {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
        title: 'SignIn',
      },
      {
        path: 'register',
        loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent),
        title: 'SignUp',
      },
      {
        path: 'forgot',
        loadComponent: () => import('./components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
        title: 'Backup Password',
      },
    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
        title: 'Home',
      },
      {
        path: 'products',
        loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent),
        title: 'Products',
      },
      {
        path: 'brands',
        loadComponent: () => import('./components/brands/brands.component').then(m => m.BrandsComponent),
        title: 'Brands',
      },
      {
        path: 'categories',
        loadComponent: () => import('./components/categories/categories.component').then(m => m.CategoriesComponent),
        title: 'Categories',
      },
      {
        path: 'wishlist',
        loadComponent: () => import('./components/wishlist/wishlist.component').then(m => m.WishlistComponent),
        title: 'Wishlist',
      },
      {
        path: 'cart',
        loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent),
        title: 'Cart',
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./components/product-details/product-details.component').then(m => m.ProductDetailsComponent),
        title: 'Details',
      },
      {
        path: 'allOrders',
        loadComponent: () => import('./components/all-orders/all-orders.component').then(m => m.AllOrdersComponent),
        title: 'All Orders',
      },
      {
        path: 'orders/:id',
        loadComponent: () => import('./components/orders/orders.component').then(m => m.OrdersComponent),
        title: 'Orders',
      },
      {
        path: 'subCategory/:id',
        loadComponent: () => import('./components/sub-category/sub-category.component').then(m => m.SubCategoryComponent),
        title: 'Category',
      },
      {
        path: 'subBrand/:id',
        loadComponent: () => import('./components/sub-brand/sub-brand.component').then(m => m.SubBrandComponent),
        title: 'Brand',
      },
      {
        path: '**',
        loadComponent: () => import('./components/notfound/notfound.component').then(m => m.NotfoundComponent),
        title: 'NotFound',
      },
    ],
  },

  {
    path: '**',
    loadComponent: () => import('./components/notfound/notfound.component').then(m => m.NotfoundComponent),
    title: 'NotFound',
  },
];
