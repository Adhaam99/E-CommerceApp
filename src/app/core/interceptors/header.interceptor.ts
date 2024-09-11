import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  
  if(req.url.includes('cart') || req.url.includes('wishlist') || req.url.includes('orders')  ){

    if(localStorage.getItem('userToken') !== null){

      req =req.clone({
        setHeaders: {token : localStorage.getItem('userToken') ! }
      })
    }
  

    
  }
  return next(req);
};
