import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CommonProvider } from "../../../providers/common/common";
import { Effect } from '../../../baseComponent'
import { GamemenuComponent } from '../../../components/gamemenu/gamemenu'
import { MenumodalComponent } from '../../../components/menumodal/menumodal'
import { UtilProvider } from '../../../providers/util/util'

import * as $ from 'jquery'
import * as Hammer from 'hammerjs';
/**
 * Generated class for the SscPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ssc',
  templateUrl: 'ssc.html',
  providers:[GamemenuComponent]
})
export class SscPage extends Effect{
    showTip:any = ['当前遗漏', '30期冷热', '平均遗漏', '最大遗漏']
    haveChoosen:any = ['当前遗漏']

    record: any = [
        {number: 23057, balls: '12345', shiwei: '大单', gewei: '小双', housan: '组六'},
        {number: 23056, balls: '34567', shiwei: '大单', gewei: '小双', housan: '组六'},
        {number: 23057, balls: '12345', shiwei: '大单', gewei: '小双', housan: '组六'},
        {number: 23056, balls: '34567', shiwei: '大单', gewei: '小双', housan: '组六'},
        {number: 23057, balls: '12345', shiwei: '大单', gewei: '小双', housan: '组六'},
        {number: 23056, balls: '34567', shiwei: '大单', gewei: '小双', housan: '组六'},
        {number: 23057, balls: '12345', shiwei: '大单', gewei: '小双', housan: '组六'},
        // {number: 23056, balls: '34567', shiwei: '大单', gewei: '小双', housan: '组六'},
        // {number: 23057, balls: '12345', shiwei: '大单', gewei: '小双', housan: '组六'},
        // {number: 23056, balls: '34567', shiwei: '大单', gewei: '小双', housan: '组六'}
    ]

    //助手菜单
    menus:any =  ['走势图','近期开奖','号码统计','玩法说明']


    list: any = []

    maxNumber:number;
    loadNumber:number = 0
    over:boolean;
    trHeight:number;
    high:number = 0


    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public common:CommonProvider, public gamemenu:GamemenuComponent, public util:UtilProvider) {
        super(common,gamemenu)
        this.list = this.record.slice(0, 2)
        this.over = this.record.length > 2 ? false:true

        if(this.record.length > 2){
            this.maxNumber = Math.ceil(this.record.length/5)
        }else{
            this.maxNumber = 0
        }

    }


    ionViewDidLoad() {
       
        console.log(document.querySelector('.tr').offsetHeight)
        this.trHeight = document.querySelector('.tr').offsetHeight

        console.log(document.getElementById('qq'))
        this.watchScroll()


        let touch = new Hammer(document.getElementById('touch'));
        touch.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
        touch.on('swipeup',()=>{
            if(this.loadNumber == this.maxNumber && this.maxNumber != 0){
                this.loadNumber = 0
                this.over = false
                this.high = 0


                setTimeout(()=> {
                   this.watchScroll()
                },0)
            }

        })

    }

    watchScroll(){
        let mc = new Hammer(document.getElementById('qq'));
        mc.get('swipe').set({direction: Hammer.DIRECTION_VERTICAL});
        mc.on('swipedown', () => {
            console.log('axiba')
            //this.record.push( {number:23056,balls:'34567',shiwei:'大单',gewei:'小双',housan:'组六'})
            if (++this.loadNumber == this.maxNumber)
                this.over = true

            if (this.loadNumber == 1)
                this.high = (this.record.slice(0,1*5).length - 2)*this.trHeight

            if (this.loadNumber == 2)
                this.high = (this.record.slice(0,2*5).length - 2)*this.trHeight

            this.list = this.record.slice(0, this.loadNumber * 5)

        })
    }

    //添加至购彩篮
    addToCart(dom){
        console.log(dom.innerText)
        if(this.common.count == 0){return}
        // 把数据放进购彩蓝
        //this.basket.addBetData(dom.innerText)
        $('<div id="ball"></div>').appendTo($('#bet-statistic'));
        this.move()
        this.util.resetData()

    }

    qqq(number){
        return number + 5
    }

    change(val){
        console.log(val)
        if(val == '走势图')
           this.navCtrl.push('GameTrendPage')

        if(val == '号码统计'){
            $('.modal').toggleClass('active')
        }
           
   }

   changeMenu(){
       
   }
}
