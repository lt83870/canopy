import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LgLabelModule } from '../label/label.module';
import { LgChoiceButtonComponent } from './choice-button.component';
import { LgChoiceGroupComponent } from './choice-group.component';

@NgModule({
  imports: [LgLabelModule, CommonModule],
  declarations: [LgChoiceGroupComponent, LgChoiceButtonComponent],
  exports: [LgChoiceGroupComponent, LgChoiceButtonComponent],
  entryComponents: [LgChoiceGroupComponent, LgChoiceButtonComponent],
})
export class LgRadioModule {}
