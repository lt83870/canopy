import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[lgSuffix]',
})
export class LgSuffixDirective {
  @HostBinding('class.lg-suffix') class = true;
}
