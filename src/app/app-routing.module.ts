import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'currency',
    loadChildren: () => import('./pages/currency-converter/currency-converter.module').then(m => m.CurrencyConverterModule)
  },
  {
    path: 'unit',
    loadChildren: () => import('./pages/unit-converter/unit-converter.module').then(m => m.UnitConverterModule)
  },
  {
    path: '',
    redirectTo: '/unit',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
