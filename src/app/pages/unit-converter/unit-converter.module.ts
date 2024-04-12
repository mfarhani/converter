import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {UnitConverterRoutingModule} from './unit-converter-routing.module';
import {UnitConverterComponent} from './unit-converter.component';

@NgModule({
  declarations: [UnitConverterComponent],
  imports: [SharedModule, UnitConverterRoutingModule],
  exports: [UnitConverterComponent]
})
export class UnitConverterModule {
}
