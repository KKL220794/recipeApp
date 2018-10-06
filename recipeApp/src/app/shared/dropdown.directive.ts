import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective {
  @HostBinding('class.open') toOpen = false;

  @HostListener('click') toggleOpen() {
    // console.log('clicked');

    this.toOpen = !this.toOpen;

  }
}
