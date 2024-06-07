import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './app-material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OverlayModule,
    ReactiveFormsModule,
    ScrollingModule,
    AppMaterialModule,
  ],
  exports: [
    CommonModule,
    OverlayModule,
    ReactiveFormsModule,
    ScrollingModule,
    AppMaterialModule,
  ],
})
export class SharedModule {}
