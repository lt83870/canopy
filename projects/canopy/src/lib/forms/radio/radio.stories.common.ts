import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import { RadioVariant } from './radio.interface';

@Component({
  selector: 'lg-reactive-form',
  template: `
    <form [formGroup]="form">
      <lg-radio-group [inline]="inline" formControlName="color" [variant]="variant">
        {{ label }}
        <lg-hint *ngIf="hint">{{ hint }}</lg-hint>
        <lg-radio-button value="red">Red</lg-radio-button>
        <lg-radio-button value="yellow">Yellow</lg-radio-button>
      </lg-radio-group>
    </form>
  `,
})
export class ReactiveFormComponent {
  @Input() inline = false;
  @Input() label: string;
  @Input() hint: string;
  @Input() variant: RadioVariant;
  @Input()
  set disabled(isDisabled: boolean) {
    if (isDisabled === true) {
      this.form.controls.color.disable();
    } else {
      this.form.controls.color.enable();
    }
  }
  get disabled(): boolean {
    return this.form.controls.color.disabled;
  }

  @Output() radioChange: EventEmitter<void> = new EventEmitter();

  form: FormGroup;

  constructor(public fb: FormBuilder) {
    this.form = this.fb.group({ color: 'red' });
    this.form.valueChanges.subscribe(val => this.radioChange.emit(val));
  }
}

export const createRadioStory = (variant: RadioVariant) => ({
  template: `
    <lg-reactive-form
    [disabled]="disabled"
    [hint]="hint"
    [inline]="inline"
    [label]="label"
    variant="${variant}"
    radioChange="radioChange($event)">
  </lg-reactive-form>
  `,
  props: {
    inline: boolean('inline', false),
    label: text('label', 'Color'),
    hint: text('hint', 'Please select a color'),
    radioChange: action('radioChange'),
    disabled: boolean('disabled', false),
  },
});
