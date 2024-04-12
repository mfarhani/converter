import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  imports: [MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule],
  exports: [MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule]
})
export class AngularMaterialModule {
}
