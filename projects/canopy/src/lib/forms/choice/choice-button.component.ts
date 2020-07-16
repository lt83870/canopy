import {
  Component,
  ElementRef,
  Host,
  HostBinding,
  Input,
  OnInit,
  Optional,
  Renderer2,
  Self,
  SkipSelf,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';

import { LgErrorStateMatcher } from '../validation/error-state-matcher';
import { LgChoiceGroupComponent } from './choice-group.component';
import { ChoiceVariant } from './choice.interface';

let nextUniqueId = 0;

@Component({
  selector: 'lg-choice-button',
  templateUrl: './choice-button.component.html',
  styleUrls: ['./choice-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LgChoiceButtonComponent implements OnInit {
  checked = false;
  _variant: ChoiceVariant = 'radio';
  set variant(variant: ChoiceVariant) {
    if (this._variant) {
      this.renderer.removeClass(
        this.hostElement.nativeElement,
        `lg-choice-button--${this.variant}`,
      );
    }
    this.renderer.addClass(
      this.hostElement.nativeElement,
      `lg-choice-button--${variant}`,
    );
    this._variant = variant;
  }
  get variant() {
    return this._variant;
  }

  @Input() id = `lg-choice-button-${++nextUniqueId}`;
  @Input() name: string;
  @Input() value: string;

  @Input()
  _disabled = false;
  get disabled(): boolean {
    return this._disabled || (this.choiceGroup !== null && this.choiceGroup.disabled);
  }
  set disabled(isDisabled: boolean) {
    this._disabled = isDisabled;
  }

  @HostBinding('class.lg-choice-button') class = true;
  @HostBinding('class.lg-choice-button--error')
  public get errorClass() {
    return this.errorState.isControlInvalid(this.control, this.controlContainer);
  }

  constructor(
    @Self() @Optional() public control: NgControl,
    private choiceGroup: LgChoiceGroupComponent,
    private errorState: LgErrorStateMatcher,
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: FormGroupDirective,
    private renderer: Renderer2,
    private hostElement: ElementRef,
  ) {}

  ngOnInit() {
    this.variant = this.choiceGroup.variant;

    if (this.choiceGroup.value === this.value) {
      this.checked = true;
    }
    this.name = this.choiceGroup.name;
  }

  onCheck() {
    this.choiceGroup.onTouched();
    if (this.choiceGroup.value !== this.value) {
      this.choiceGroup.value = this.value;
    }
  }
}
