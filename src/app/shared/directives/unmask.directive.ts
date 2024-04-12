import {Directive, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {NgModel} from '@angular/forms';

@Directive({
  selector: '[ngModel][unMask]',
  host: {
    '(focus)': 'onFocus()',
    '(keydown)': 'keyPress($event)'
  }
})
export class UnMaskDirective implements OnInit {

  private el: HTMLInputElement;
  private keyPressKey: string = '';
  @Output() ngModelChange: EventEmitter<any>;

  constructor(
    private ngModel: NgModel,
    private element: ElementRef) {

    this.el = this.element.nativeElement;
    this.ngModelChange = new EventEmitter();
  }

  public ngOnInit(): void {
    //setTimeout is necessary here. When the input element under form tag, valueAccessor is not working.
    setTimeout(() => {
      this.registerModuleOnChange();
    });

  }

  public onFocus() {
    //setTimeout is necessary here for miss located cursors.
    setTimeout(() => {
      this.locateCursorToEnd();
    });
  }

  public keyPress(event: KeyboardEvent) {
    this.keyPressKey = event.key;
  }

  private registerModuleOnChange(): void {
    this.ngModel?.valueAccessor?.registerOnChange((value: string) => {

      value = value.replace('_', '');
      if (value.length < 1) value = '0';

      let incomingData = parseInt(this.keyPressKey);
      let inputValue = String(value).replace(/[^0-9.-]/g, '') || '0';
      let excludedSignInput = String(value).replace(/[^0-9,.-]/g, '') || '0';
      let hasPeriod = inputValue.endsWith('.');
      const hasNegative = inputValue.charAt(0) === '-';
      const currentCursorLocaltion = this.el.selectionStart || 0;
      if (hasPeriod && this.keyPressKey.toLocaleLowerCase() === 'backspace') {
        hasPeriod = false;
        inputValue = inputValue.replace('.', '');
      }

      let parsedInput = parseFloat(inputValue);
      if (isNaN(parsedInput)) parsedInput = 0;
      if (parsedInput === 0 && incomingData > 0) parsedInput = incomingData;

      if (parsedInput === 0 && inputValue === '0') {
        setTimeout(() => {
          this.locateCursorToEnd();
        });
      } else if (inputValue.indexOf('.') >= 0 && String(parsedInput).indexOf('.') < 0) {
        setTimeout(() => {
          this.setValue(value);
          this.locateCursorTo(
            value.indexOf(excludedSignInput) + excludedSignInput.length,
            value.indexOf(excludedSignInput) + excludedSignInput.length);
        });
      } else if (hasNegative && parsedInput === 0) {
        setTimeout(() => {
          this.setValue(inputValue);
          this.locateCursorTo(1, inputValue.length);
        });
      } else setTimeout(() => {
        this.locateCursorTo(currentCursorLocaltion, currentCursorLocaltion);
      });

      this.ngModel?.valueAccessor?.writeValue(parsedInput);
      this.ngModelChange.emit(parsedInput);
    });
  }

  private locateCursorToEnd(): void {
    this.el.selectionStart = this.el.value?.length || 0;
    this.el.selectionEnd = this.el.value?.length || 0;
  }

  private locateCursorTo(start?: number, end?: number): void {
    this.el.selectionStart = start || 0;
    this.el.selectionEnd = end || 0;
  }

  private setValue(value: string): void {
    this.el.value = value;
  }
}
