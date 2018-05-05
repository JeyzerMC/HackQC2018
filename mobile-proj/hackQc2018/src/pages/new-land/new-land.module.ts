import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewLandPage } from './new-land';

@NgModule({
  declarations: [
    NewLandPage,
  ],
  imports: [
    IonicPageModule.forChild(NewLandPage),
  ],
})
export class NewLandPageModule {}
