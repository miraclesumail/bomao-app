import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasketDataProvider } from '../../providers/basket-data/basket-data'
import { CommonProvider } from "../../providers/common/common";
import { trigger ,state,transition,animate,style} from "@angular/animations";
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the BasketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
  animations:[
    trigger('show',[
       state('visable',style({
         opacity: 1,
         transform:'translate3d(0, 0, 0)'
       })),
       state('invisable', style({
         opacity: 0,
        transform:'translate3d(0, 100%, 0)'
       })),
       transition('* => *',animate('.5s'))
    ])
   ]
})

export class BasketPage {
  show:string = "invisable"

  constructor(public navCtrl: NavController, public navParams: NavParams,  public basket:BasketDataProvider, public common:CommonProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasketPage');
  }

  toggle(){
    this.show = this.show == 'invisable' ? 'visable' : 'invisable'
  }

  change(number){
    this.basket.statistic.multiple += number
  }

  presentConfirm() {
  let alert = this.alertCtrl.create({
    title: 'Confirm purchase',
    message: 'Do you want to buy this book?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Buy',
        handler: () => {
          console.log('Buy clicked');
        }
      }
    ]
  });
  alert.present();
}

}
