import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[lgPrefix]',
})
export class LgPrefixDirective {
  @HostBinding('class.lg-prefix') class = true;
}
