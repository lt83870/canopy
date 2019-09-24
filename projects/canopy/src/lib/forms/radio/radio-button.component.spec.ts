import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LgRadioButtonComponent } from './radio-button.component';
import { LgRadioGroupComponent } from './radio-group.component';

class RadioGroupStub {
  name = 'color';
  get value() {
    return 'red';
  }
  set value(v) {}
}

describe('LgRadioButtonComponent', () => {
  let component: LgRadioButtonComponent;
  let fixture: ComponentFixture<LgRadioButtonComponent>;

  const radioGroupStub: Partial<LgRadioGroupComponent> = new RadioGroupStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LgRadioButtonComponent],
      providers: [{ provide: LgRadioGroupComponent, useValue: radioGroupStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LgRadioButtonComponent);
    component = fixture.componentInstance;
  });

  it('sets its name from the radio group name', () => {
    fixture.detectChanges();
    expect(component.name).toBe('color');
  });

  it('sets the radio group value when checked', () => {
    const valueSpy = spyOnProperty(radioGroupStub, 'value');
    component.value = 'red';
    const radio = fixture.debugElement.query(By.css('[type="radio"'));
    radio.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(valueSpy).toHaveBeenCalled();
  });
});