import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SscServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SscServiceProvider {
  historyNumbers = [
    {number:'01期', history:[5,7,7,5,7]},
    {number:'02期', history:[3,3,3,8,5]},
    {number:'03期', history:[9,6,6,9,5]},
    {number:'04期', history:[6,3,3,2,2]},
    {number:'05期', history:[8,5,5,1,3]},
    {number:'06期', history:[2,2,2,4,4]},
    {number:'07期', history:[9,8,3,5,7]},
    {number:'08期', history:[4,5,7,1,5]},
    {number:'09期', history:[3,5,6,8,2]},
    {number:'10期', history:[7,5,3,9,3]},
    {number:'11期', history:[6,5,5,1,4]}
  ]

  constructor(public http: HttpClient) {
    console.log('Hello SscServiceProvider Provider');
  }

  

}
