import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LottoryCenterPage } from './lottory-center';

@NgModule({
  declarations: [
    LottoryCenterPage,
  ],
  imports: [
    IonicPageModule.forChild(LottoryCenterPage),
  ],
})
export class LottoryCenterPageModule {}
