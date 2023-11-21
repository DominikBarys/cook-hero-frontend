import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule],
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SpinnerComponent,
    FormsModule,
  ],
})
export class SharedModule {}
