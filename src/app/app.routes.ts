import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { SubBrandComponent } from './components/sub-brand/sub-brand.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    canActivate:[logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },

      { path: 'login', component: LoginComponent,title:'SignIn' },

      { path: 'register', component: RegisterComponent,title:'SignUp' },

      { path: 'forgot', component: ForgotPasswordComponent,title:'Backup Password' },

    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,
    canActivate:[authGuard],
    children: [

      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent,title:'Home' },
      { path: 'products', component: ProductsComponent,title:'Products' },
      { path: 'brands', component: BrandsComponent,title:'Brands' },
      { path: 'categories', component: CategoriesComponent,title:'Categories' },
      { path:'wishlist',component:WishlistComponent,title:'Wishlist'},
      { path: 'cart', component: CartComponent,title:'Cart' },
      { path: 'details/:id', component: ProductDetailsComponent,title:'Details' },
      { path: 'allOrders', component: AllOrdersComponent,title:'All Orders' },
      { path: 'orders/:id', component: OrdersComponent,title:' Orders' },
      { path: 'subCategory/:id', component: SubCategoryComponent,title:' Category ' },
      { path: 'subBrand/:id', component: SubBrandComponent,title:' Brand ' },

    ],
  },

  { path: '**', component: NotfoundComponent,title:'NotFound' },
];
