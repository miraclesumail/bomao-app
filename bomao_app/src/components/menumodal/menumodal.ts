import { Component,Input,Output,EventEmitter } from '@angular/core';

/**
 * Generated class for the MenumodalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menumodal',
  templateUrl: 'menumodal.html'
})
export class MenumodalComponent {
  @Input('hasChoosen')hasChoosen:any[];
  @Output('toggle') change: EventEmitter<any> = new EventEmitter<any>();

  text: string

  choice:string[] = ['当前遗漏', '30期冷热', '平均遗漏', '最大遗漏']

  constructor() {
    console.log('Hello MenumodalComponent Component');
    this.text = 'Hello World';
  }

  toggleChoose(choice){
    this.change.emit(choice)
  }

  isActive(item){
    return this.hasChoosen.indexOf(item) > -1
  }
}
