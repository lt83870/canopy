import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { anything, instance, mock, verify, when } from 'ts-mockito';

import { LgErrorStateMatcher } from '../validation/error-state-matcher';
import { LgChoiceButtonComponent } from './choice-button.component';
import { LgChoiceGroupComponent } from './choice-group.component';

describe('LgchoiceButtonComponent', () => {
  let component: LgChoiceButtonComponent;
  let fixture: ComponentFixture<LgChoiceButtonComponent>;
  let errorStateMatcherMock: LgErrorStateMatcher;
  let choiceGroupMock: LgChoiceGroupComponent;

  beforeEach(async(() => {
    errorStateMatcherMock = mock(LgErrorStateMatcher);
    choiceGroupMock = mock(LgChoiceGroupComponent);
    when(choiceGroupMock.name).thenReturn('color');
    when(choiceGroupMock.variant).thenReturn('segment');

    TestBed.configureTestingModule({
      declarations: [LgChoiceButtonComponent],
      providers: [
        {
          provide: LgChoiceGroupComponent,
          useFactory: () => instance(choiceGroupMock),
        },
        {
          provide: LgErrorStateMatcher,
          useFactory: () => instance(errorStateMatcherMock),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LgChoiceButtonComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('sets its name from the choice group name', () => {
    expect(component.name).toBe('color');
  });

  describe('the variant', () => {
    it('should be set based on the choice group variant', () => {
      expect(component.variant).toBe('segment');
    });

    it('should set the correct class modifier', () => {
      expect(fixture.debugElement.nativeElement.getAttribute('class')).toContain(
        'lg-choice-button--segment',
      );

      when(choiceGroupMock.variant).thenReturn('radio');
      fixture = TestBed.createComponent(LgChoiceButtonComponent);
      component = fixture.componentInstance;

      expect(fixture.debugElement.nativeElement.getAttribute('class')).not.toContain(
        'lg-choice-button--segment',
      );
    });
  });

  // https://github.com/NagRock/ts-mockito/issues/120
  xit('sets the choice group value when checked', () => {
    component.value = 'red';
    const choice = fixture.debugElement.query(By.css('input'));
    choice.triggerEventHandler('click', null);
    fixture.detectChanges();
    verify(choiceGroupMock.value).called();
    expect().nothing();
  });

  it('sets the disabled property when the choice group is disabled', () => {
    when(choiceGroupMock.disabled).thenReturn(true);
    fixture.detectChanges();
    expect(component.disabled).toBe(true);
  });

  // https://github.com/NagRock/ts-mockito/issues/120
  xit('marks the choiceGroup as touched if the choice is checked', () => {
    const choice = fixture.debugElement.query(By.css('input'));
    choice.triggerEventHandler('click', null);
    fixture.detectChanges();
    verify(choiceGroupMock.onTouched()).once();
    expect().nothing();
  });

  it('adds the error class if the form field is invalid', () => {
    when(errorStateMatcherMock.isControlInvalid(anything(), anything())).thenReturn(true);
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.className).toContain(
      'lg-choice-button--error',
    );
  });
});
