import {NgModule} from '@angular/core';
import {AngularMaterialModule} from './angular-material/angular-material.module';
import {FlexModule} from '@angular/flex-layout';
import {TextMaskModule} from 'angular2-text-mask';

@NgModule({
  imports: [
    AngularMaterialModule,
    FlexModule,
    TextMaskModule
  ],
  exports: [
    AngularMaterialModule,
    FlexModule,
    TextMaskModule
  ]
})
export class LibraryModule {
}
