import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import { ChoiceVariant } from './choice.interface';

@Component({
  selector: 'lg-reactive-form',
  template: `
    <form [formGroup]="form">
      <lg-choice-group [inline]="inline" formControlName="color" [variant]="variant">
        {{ label }}
        <lg-hint *ngIf="hint">{{ hint }}</lg-hint>
        <lg-choice-button value="red">Red</lg-choice-button>
        <lg-choice-button value="yellow">Yellow</lg-choice-button>
      </lg-choice-group>
    </form>
  `,
})
export class ReactiveFormComponent {
  @Input() inline = false;
  @Input() label: string;
  @Input() hint: string;
  @Input() variant: ChoiceVariant;
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

  @Output() choiceChange: EventEmitter<void> = new EventEmitter();

  form: FormGroup;

  constructor(public fb: FormBuilder) {
    this.form = this.fb.group({ color: 'red' });
    this.form.valueChanges.subscribe(val => this.choiceChange.emit(val));
  }
}

export const createChoiceStory = (variant: ChoiceVariant) => ({
  template: `
    <lg-reactive-form
    [disabled]="disabled"
    [hint]="hint"
    [inline]="inline"
    [label]="label"
    variant="${variant}"
    (choiceChange)="choiceChange($event)">
  </lg-reactive-form>
  `,
  props: {
    inline: boolean('inline', false),
    label: text('label', 'Color'),
    hint: text('hint', 'Please select a color'),
    choiceChange: action('choiceChange'),
    disabled: boolean('disabled', false),
  },
});
