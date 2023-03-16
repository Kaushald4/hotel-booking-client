import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.css']
})
export class MyInputComponent {
  @Output() inputValue = new EventEmitter<string>();
  @Input() name: string = "";

  onInputChange(event: any) {
    this.inputValue.emit(JSON.stringify({ value: event.target.value, name: event.target.name}));
  }

}
