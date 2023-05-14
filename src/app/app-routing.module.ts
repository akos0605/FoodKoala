import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { NegatedAuthGuard } from 'src/app/core/guards/negated-auth.guard';
import { OnlineGuard } from 'src/app/core/guards/online.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/authentication/pages/login/login.module').then(
        m => m.LoginModule
      ),
    canActivate: [NegatedAuthGuard, OnlineGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/authentication/pages/register/register.module').then(
        m => m.RegisterModule
      ),
    canActivate: [NegatedAuthGuard, OnlineGuard],
  },
  {
    path: 'foods',
    loadChildren: () =>
      import('./features/food/pages/foods/foods.module').then(m => m.FoodsModule),
  },
  {
    path: 'food/:id',
    loadChildren: () =>
      import('./features/food/pages/food/food.module').then(m => m.FoodModule),
    canActivate: [OnlineGuard],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./features/cart/pages/cart/cart.module').then(m => m.CartModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./shared/components/not-found/not-found.module').then(
        m => m.NotFoundModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
