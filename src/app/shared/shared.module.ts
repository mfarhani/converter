import {NgModule} from '@angular/core';
import {LibraryModule} from './libraries/library.module';
import {CommonModule, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DirectivesModule} from './directives/directives.module';

@NgModule({
  imports: [LibraryModule, DirectivesModule, CommonModule,
    FormsModule],
  exports: [LibraryModule, DirectivesModule, CommonModule,
    FormsModule]
})
export class SharedModule {

}
