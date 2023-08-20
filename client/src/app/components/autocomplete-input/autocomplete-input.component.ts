import { Component, ElementRef, HostListener } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AutocompleteInputComponent,
      multi: true
    }
  ]
})
export class AutocompleteInputComponent implements ControlValueAccessor {

  public value: string | null = null;

  public onChange = (value: string) => {};
  public onTouched = () => {};

  public searchIcon = faMagnifyingGlass;

  public showAutoComplete = false;

  constructor(private readonly elementRef: ElementRef) { }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = (value) => {
      this.showAutoComplete = true;
      fn(value);
    };
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: any) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.showAutoComplete = false;
    }
  }
}
