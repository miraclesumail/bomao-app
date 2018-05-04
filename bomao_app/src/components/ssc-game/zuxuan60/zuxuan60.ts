import { Component } from '@angular/core';
import { CommonProvider } from '../../../providers/common/common'

/**
 * Generated class for the Zuxuan60Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zuxuan60',
  templateUrl: 'zuxuan60.html'
})
export class Zuxuan60Component {

  text: string;

  constructor(public common:CommonProvider) {
    console.log('Hello Zuxuan60Component Component');
    this.text = 'Hello World';
  }

   qqq(number){
        return number + 5
    }
}
