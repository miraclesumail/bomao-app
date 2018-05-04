import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ToolsProvider } from '../tools/tools'
import { Events } from 'ionic-angular';

import { HttpClientProvider } from '../http-client/http-client'
import * as $ from 'jquery'
import {observe} from "../tools/observe";
let _ = new observe();
/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {
  pid = new Subject();

  bonus:number;
  open:boolean = false
  //倒计时
  timer:any;
  //用于存储现在游戏所有的玩法
  gameMethodConfig:Array<any> = [];
  data:any;
  ballData:any = [];
  small:any;
  method:any;

  //xiao wan fa
  smallKind:any;

  //小玩法名称
  smallMethod:string;
  bigIndex:any;

  visible:string = 'invisable';
  tabYuan:string = "元";
  // 元 角 分
  tabVisible:string = 'invisable'

  //形成的注单数
  count:number = 0;
  betPrice:number = 0;

  // 添加到购物篮数
  cartNumber:number = 0;
  // odd even big small
  btn:any[];
  singleBtn:Array<any>;

  countTime:any = {
    'total': '',
    'days': '',
    'hours': '',
    'minutes': '',
    'seconds': ''
  }


  constructor(public tools:ToolsProvider, public http:HttpClientProvider, public events:Events) {
    console.log('Hello CommonProvider Provider');
    this.produce()
    this.pid.subscribe((val) => {
        this.initData(val);
    })
    this.singleBtn = this.tools.copy([
    {name:"全",flag:false},{name:"大",flag:false},{name:"小",flag:false},{name:"奇",flag:false},{name:"偶",flag:false},{name:"清",flag:false}
    ],true)

      this.events.subscribe('changeYuan',(val) => {
          console.log('wefwewf')
          let origin = this.tabYuan == '元' ? 1 : this.tabYuan == '角' ? 0.1 : 0.01
          let percent = val == '元' ? 1 : val == '角' ? 0.1 : 0.01
          this.betPrice = this.count*2*percent
          console.log(origin)
          console.log(percent)
          this.bonus *= percent/origin
          this.tabYuan = val

      })
  }


    async initData(name){
        this.data = (await this.http.fetchData(name)).list;


        this.gameMethodConfig = this.data;

        this.small = this.gameMethodConfig[0].children;
        this.smallKind = this.gameMethodConfig[0].children[0].children[0]

        console.log(this.smallKind)
        let percent = this.tabYuan == '元' ? 1 : this.tabYuan == '角' ? 0.1 : 0.01
        this.bonus = this.smallKind.bonus*percent

        if(this.small.length)
            this.ballData = this.tools.copy(this.gameMethodConfig[0].children[0].children[0].bet_numberArrObj, true)
        //this.ballData = arr
        this.method = this.gameMethodConfig[0].name;
        this.bigIndex = 0

        if(this.small.length)
            this.smallMethod = this.small[0].children[0].name;
        //this.changeMethod(this.data.list[0].name);
        this.btn = this.ballData.map(ele => [{name:"全",flag:false},{name:"大",flag:false},{name:"小",flag:false},{name:"奇",flag:false},{name:"偶",flag:false},{name:"清",flag:false}])
        console.log(this.ballData)
        console.log(this.btn)
    }

    setGameConfig(index,index2,name){
        if(this.bigIndex!=index || name!=this.smallMethod){
            this.ballData = this.tools.copy(this.gameMethodConfig[index].children[index2].children.filter(ele => ele.name == name)[0].bet_numberArrObj, true)

            this.btn = this.ballData.map(ele => [{name:"全",flag:false},{name:"大",flag:false},{name:"小",flag:false},{name:"奇",flag:false},{name:"偶",flag:false},{name:"清",flag:false}])

            console.log(this.ballData)
            console.log(this.btn)
        }
        console.log(index)
        console.log(name)
        this.bigIndex = index
        // if(this.method != this.gameMethodConfig[index].name){
        //
        //     this.events.publish('changeTrend')
        // }

        this.method = this.gameMethodConfig[index].name

        //console.log(this.gameMethodConfig[index].children[index2])
        this.small = this.gameMethodConfig[index].children
        console.log(this.small)
        let temp;
        this.small.forEach((ele,index) => {
            //temp = ele.children.filter(item => item.name == name)[0]

            ele.children.forEach(item => {
                if(item.name == name)
                   temp = item
            })
        })
        console.log(temp)
        this.smallKind = temp
        console.log(this.smallKind)
        // let percent = this.tabYuan == '元' ? 1 : this.tabYuan == '角' ? 0.1 : 0.01
        // this.bonus = this.smallKind.bonus*percent
        this.smallMethod = name
    }

    //计算注单
    calculate(){
        let count = 1;
        this.ballData.forEach((item,index) => {
            count *=  item.value.filter(ele => ele == 1).length
        })
        this.count = count
        let percent = this.tabYuan == '元' ? 1 : this.tabYuan == '角' ? 0.1 : 0.01
        this.betPrice = this.count*2*percent
    }

    toggle(){
        console.log('dddd')
        this.visible = this.visible == 'invisable' ? 'visable':'invisable'
        this.visible == 'visable' ? $('.body-bg').fadeIn(1000) : $('.body-bg').fadeOut(1000)
    }

    openTab(){
        console.log('asss')
        this.tabVisible = 'visible'
    }

    produce(){
      this.countDown(Math.floor(Math.random()*30)*1000)
      
    }

    countDown(time){
        this.timer = setInterval(()=> {
        if(time <1000){
            clearInterval(this.timer)
            //this.global.showToast('进入新一期开奖',2000)
            this.produce()
        } 
        this.countTime = this.getTimeRemaining(time)
        time -= 1000
        },1000)
    }

    getTimeRemaining(t) {
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
      'total': t,
      'days': days,
      'hours': ('0' + hours).slice(-2),
      'minutes': ('0' + minutes).slice(-2),
      'seconds': ('0' + seconds).slice(-2)
    };
  }
}
