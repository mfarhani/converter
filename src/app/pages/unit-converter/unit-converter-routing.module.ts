import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UnitConverterComponent} from './unit-converter.component';

const routes: Routes = [
  {path: '', component: UnitConverterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitConverterRoutingModule {

}
