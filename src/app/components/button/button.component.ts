import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() title:String = "";
  @Input() isLoading:boolean = false;
  @Output() btnClick = new EventEmitter();

  onClick() {
    console.log(this.isLoading)
    this.btnClick.emit();
  }
}
