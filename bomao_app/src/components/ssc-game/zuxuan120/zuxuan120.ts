import { Component } from '@angular/core';
import { CommonProvider } from '../../../providers/common/common'
/**
 * Generated class for the Zuxuan120Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zuxuan120',
  templateUrl: 'zuxuan120.html'
})
export class Zuxuan120Component {

  text: string;

  constructor(public common:CommonProvider) {
    console.log('Hello Zuxuan120Component Component');
    this.text = 'Hello World';
  }

  qqq(number){
        return number + 5
    }

}
