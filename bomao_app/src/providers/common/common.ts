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
  open:boolean = false

  //用于存储现在游戏所有的玩法
  gameMethodConfig:Array<any> = [];
  data:any;
  ballData:any = [];
  small:any;
  method:any;
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


  constructor(public tools:ToolsProvider, public http:HttpClientProvider, public events:Events) {
    console.log('Hello CommonProvider Provider');
    this.pid.subscribe((val) => {
        this.initData(val);
    })
    this.singleBtn = this.tools.copy([
    {name:"全",flag:false},{name:"大",flag:false},{name:"小",flag:false},{name:"奇",flag:false},{name:"偶",flag:false},{name:"清",flag:false}
    ],true)

      this.events.subscribe('changeYuan',(val) => {
          let percent = val == '元' ? 1 : this.tabYuan == '角' ? 0.1 : 0.01
          this.betPrice = this.count*2*percent
      })
  }


    async initData(name){
        console.log('wcnm')
        this.data = (await this.http.fetchData(name)).list;


        this.gameMethodConfig = this.data;

        this.small = this.gameMethodConfig[0].children;
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

        this.small = this.gameMethodConfig[0].children
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

}
