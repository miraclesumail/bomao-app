import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {HotGmageListPage} from '../hot-gmage-list/hot-gmage-list';
import { CommonProvider } from "../../providers/common/common";
declare var Swiper;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  banner_swiper: any;
  info_swiper: any;


  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public common:CommonProvider) {

  }

  ionViewDidLoad() {
    this.swiper_init()
  }

  swiper_init() {
    this.banner_swiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 5,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },

    });

    this.info_swiper = new Swiper('.info-slider', {
      direction: 'vertical',
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      }
    })
  }

  //更多彩种
  allGameModel() {
    // alert(1)
    let modal = this.modalCtrl.create(HotGmageListPage);
    modal.present();
  }

  // pushPage(pageName,title){
  //   this.navCtrl.push(pageName,{
  //     title:title
  //   })
  // }

  goToSsc(){
     this.common.pid.next('./assets/ssc.json')
     this.navCtrl.push('SscPage')
  }
}
