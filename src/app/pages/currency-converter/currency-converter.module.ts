import {NgModule} from '@angular/core';
import {CurrencyConverterComponent} from './currency-converter.component';
import {SharedModule} from '../../shared/shared.module';
import {CurrencyConverterRoutingModule} from './currency-converter-routing.module';

@NgModule({
  declarations: [CurrencyConverterComponent],
  imports: [SharedModule, CurrencyConverterRoutingModule],
  exports: [CurrencyConverterComponent]
})
export class CurrencyConverterModule {
}
