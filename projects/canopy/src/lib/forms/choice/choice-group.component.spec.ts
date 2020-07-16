import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { MockComponents } from 'ng-mocks';
import { anything, instance, mock, when } from 'ts-mockito';

import { LgHintComponent } from '../hint';
import { LgErrorStateMatcher } from '../validation/error-state-matcher';
import { LgValidationComponent } from '../validation/validation.component';
import { LgChoiceButtonComponent } from './choice-button.component';
import { LgChoiceGroupComponent } from './choice-group.component';
import { ChoiceVariant } from './choice.interface';

const validationTestId = 'test-validation-id';
const hintTestId = 'test-hint-id';

@Component({
  template: `
    <form (ngSubmit)="login()" [formGroup]="form" #testForm="ngForm">
      <lg-choice-group formControlName="color" [variant]="variant">
        Color
        <lg-hint id="${hintTestId}">Choose your favourite</lg-hint>
        <lg-choice-button value="red">Red</lg-choice-button>
        <lg-choice-button value="yellow">Yellow</lg-choice-button>
        <lg-choice-button value="blue">Blue</lg-choice-button>
        <lg-validation id="${validationTestId}" *ngIf="isControlInvalid(color, testForm)">
          Error
        </lg-validation>
      </lg-choice-group>
    </form>
  `,
})
class TestChoiceGroupComponent {
  @Input() variant: ChoiceVariant = 'radio';

  get color() {
    return this.form.get('color');
  }
  form: FormGroup;

  constructor(public fb: FormBuilder, private errorState: LgErrorStateMatcher) {
    this.form = this.fb.group({
      color: [{ value: '', disabled: false }, [Validators.required]],
    });
  }

  isControlInvalid(control: AbstractControl, form: FormGroupDirective) {
    return this.errorState.isControlInvalid(control, form);
  }

  login() {}
}

describe('LgChoiceGroupComponent', () => {
  let fixture: ComponentFixture<TestChoiceGroupComponent>;
  let groupDebugElement: DebugElement;
  let errorDebugElement: DebugElement;
  let hintDebugElement: DebugElement;
  let fieldsetDebugElement: DebugElement;
  let choiceDebugElements: Array<DebugElement>;

  let groupInstance: LgChoiceGroupComponent;
  let choiceInstances: Array<LgChoiceButtonComponent>;
  let component: TestChoiceGroupComponent;
  let errorStateMatcherMock: LgErrorStateMatcher;

  beforeEach(async(() => {
    errorStateMatcherMock = mock(LgErrorStateMatcher);

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        TestChoiceGroupComponent,
        LgChoiceGroupComponent,
        LgChoiceButtonComponent,
        MockComponents(LgValidationComponent, LgHintComponent),
      ],
      providers: [
        {
          provide: LgErrorStateMatcher,
          useFactory: () => instance(errorStateMatcherMock),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestChoiceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    groupDebugElement = fixture.debugElement.query(By.directive(LgChoiceGroupComponent));
    groupInstance = groupDebugElement.injector.get<LgChoiceGroupComponent>(
      LgChoiceGroupComponent,
    );

    hintDebugElement = fixture.debugElement.query(By.directive(LgHintComponent));

    fieldsetDebugElement = fixture.debugElement.query(By.css('fieldset'));

    choiceDebugElements = fixture.debugElement.queryAll(By.css('lg-choice-button'));

    choiceInstances = choiceDebugElements.map(debugEl => debugEl.componentInstance);
  }));

  it('sets all choice buttons to the same name', () => {
    expect(groupInstance.name.length > 0).toBe(true);
    const name = choiceInstances.pop().name;
    for (const choice of choiceInstances) {
      expect(choice.name).toBe(name);
    }
  });

  it('adds a wrapper for the segment choice in the template', () => {
    expect(fixture.debugElement.query(By.css('.lg-choice-segment'))).toBeNull();

    component.variant = 'segment';
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.lg-choice-segment')).nativeElement,
    ).toBeDefined();
  });

  it('checks the selected choice button when a value is provided', () => {
    const blueOption: DebugElement = choiceDebugElements.find(
      choiceDebugElement => choiceDebugElement.componentInstance.value === 'blue',
    );
    blueOption.query(By.css('input')).triggerEventHandler('click', null);
    fixture.detectChanges();
    const checkedOption: DebugElement = choiceDebugElements.find(
      choiceDebugElement => choiceDebugElement.componentInstance.checked === true,
    );
    expect(checkedOption.componentInstance.value).toBe('blue');
  });

  it('sets unique ids on all the choice buttons', () => {
    const choiceIds = choiceInstances.map(({ id }) => id);
    expect(new Set(choiceIds).size).toBe(choiceIds.length);
    for (const id of choiceIds) {
      expect(/lg-choice-button-\d{1,3}/.test(id)).toBe(true);
    }
  });

  it('marks the selected choice when the value is changed', () => {
    groupInstance.value = 'red';
    fixture.detectChanges();
    const selected = choiceInstances.find(choice => choice.value === 'red');
    expect(selected.checked).toBe(true);
    const notSelected = choiceInstances.filter(choice => choice.value !== 'red');
    for (const choice of notSelected) {
      expect(choice.checked).toBe(false);
    }
  });

  it('updates the model value when a choice option is checked', () => {
    const blueOption: DebugElement = choiceDebugElements.find(
      choiceDebugElement => choiceDebugElement.componentInstance.value === 'blue',
    );
    blueOption.query(By.css('input')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.form.controls.color.value).toBe('blue');
  });

  it('links the hint to the fieldset with the correct aria attributes', () => {
    expect(hintDebugElement.nativeElement.getAttribute('id').length).not.toEqual(0);
    expect(fieldsetDebugElement.nativeElement.getAttribute('aria-describedBy')).toContain(
      hintDebugElement.nativeElement.getAttribute('id'),
    );
  });

  it('links the error to the fieldset with the correct aria attributes', () => {
    when(errorStateMatcherMock.isControlInvalid(anything(), anything())).thenReturn(true);
    fixture.detectChanges();
    errorDebugElement = fixture.debugElement.query(By.directive(LgValidationComponent));

    expect(errorDebugElement.nativeElement.getAttribute('id').length).not.toEqual(0);
    expect(fieldsetDebugElement.nativeElement.getAttribute('aria-describedBy')).toContain(
      errorDebugElement.nativeElement.getAttribute('id'),
    );
  });

  it('combines both the hint and error ids to create the aria described attribute', () => {
    when(errorStateMatcherMock.isControlInvalid(anything(), anything())).thenReturn(true);
    fixture.detectChanges();
    errorDebugElement = fixture.debugElement.query(By.directive(LgValidationComponent));

    const errorId = errorDebugElement.nativeElement.getAttribute('id');
    const hintId = hintDebugElement.nativeElement.getAttribute('id');
    fixture.detectChanges();
    expect(fieldsetDebugElement.nativeElement.getAttribute('aria-describedby')).toBe(
      `${hintId} ${errorId}`,
    );
  });

  it('disables the options when the disabled property is set', () => {
    component.form.controls.color.disable();
    fixture.detectChanges();
    for (const choice of choiceInstances) {
      expect(choice.disabled).toBe(true);
    }
  });

  it('adds the error class if the form field is invalid', () => {
    when(errorStateMatcherMock.isControlInvalid(anything(), anything())).thenReturn(true);
    fixture.detectChanges();
    expect(groupDebugElement.nativeElement.className).toContain('lg-choice-group--error');
  });

  it('removes the error class if the form field is valid', () => {
    when(errorStateMatcherMock.isControlInvalid(anything(), anything())).thenReturn(
      false,
    );
    fixture.detectChanges();
    expect(groupDebugElement.nativeElement.className).not.toContain(
      'lg-choice-group--error',
    );
  });
});
