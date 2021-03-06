import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonProvider } from '../common/common'
import {Observable} from 'rxjs/Observable';
import { Vibration } from '@ionic-native/vibration';

/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilProvider {
  shake:boolean = false;

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
  fakeData:any = {}

  //统计遗漏
  yilou:any;

  //统计冷热
  lengre:any;


  fakeTrend:Array<any> = [[5,3,9,8,6,2,9,1,8,6,4],[7,3,6,5,3,2,8,3,5,6,9],[7,3,6,5,3,2,8,3,5,6,9],[5,8,9,1,2,4,5,7,8,3,2],[7,5,5,3,2,4,5,6,8,1,6]]

  constructor(public http: HttpClient,public common:CommonProvider, public vibration: Vibration) {
    console.log('Hello UtilProvider Provider');
    this.generateFake()
    let yilou = {},lengre = {};
    for(let aa in this.fakeData){
        yilou[aa.substr(0,1)] = []
        lengre[aa.substr(0,1)] = []
        let length = this.fakeData[aa].length

        for(let i = 1 ; i<this.fakeData[aa][length-1].length;i++){
            let item = this.fakeData[aa][length-1][i]
            lengre[aa.substr(0,1)].push('--')
            if(!item.choose)
                yilou[aa.substr(0,1)].push(item.number)
            else
                yilou[aa.substr(0,1)].push(this.fakeData[aa][length-2][i].number)
                    
        }
    }
    this.yilou = yilou
    this.lengre = lengre
    console.log(this.yilou)
    console.log(this.lengre)
    console.log(this.common.ballData)
  }

  fetch(item){
      /* item  if is lengre  fetch data from server
         when lengre == '--'
         return data {
             'wan':[],'qian':[]
         }
         
         if lengre haa loaded  return 
      */
  }

   generateFake(){
    for(let k = 0; k<this.fakeTrend.length;k++){
      let tempData = this.fakeTrend[k]
      let arr = []
      for(let i = 1; i<=tempData.length; i++){
        let inner = []
       // inner.push({number:this.historyNumbers[i-1].number, choose:false})
        for(let j = 0; j<=9;j++){
            if(j == tempData[i-1]){
               inner.push({number:tempData[i-1], choose:true})
            }else{
               if(i == 1){
                 inner.push({number:1,choose:false})
               }else{
                 if(arr[i-2][j].choose){
                    inner.push({number:1, choose:false})
                 }else{
                    inner.push({number:arr[i-2][j].number+1, choose:false})
                 }
               }
            }  
        }  
        
        arr.push(inner)
       }
       for(let i=0;i<arr.length;i++){
           arr[i].unshift({number:this.historyNumbers[i].number, choose:false})
       }

       console.log(arr)
      // this.fakeData.push({[this.deal(k)]:arr})
       this.fakeData[this.deal(k)] = arr
    }
    
   // this.fakeData = arr
    console.log(this.fakeData)
  }

    deal(number){
     if(number == 0)
        return '万位走势'
     if(number == 1)
        return '千位走势'
     if(number == 2)
        return '百位走势'
     if(number == 3)
        return '十位走势'
     if(number == 4)
        return '个位走势'
  }

    changeToggle(row,column){
        console.log('wcnmbg')
        this.common.ballData = this.common.ballData.map((item,index) => {
            if(index == row){
                item.value = item.value.map((ele,index) => {
                    if(index == column){
                        return ele == 1 ? 0 : 1
                    }else{
                        return ele
                    }
                })
                return item
            }else{
                return item
            }
        })
        this.common.calculate()
    }

    //奇偶 全清
    changeActive(index,choice,name){
               //this.changeChooseStatus(index,choice)
           
           this.changeChooseStatus(index,choice)
            switch(name){
                case "全":
                    this.changeAll(index)
                    break;
                case "奇":
                    this.changeOdd(index)
                    break;
                case "偶":
                    this.changeEven(index)
                    break;
                case "大":
                    this.changeBig(index)
                    break;
                case "小":
                    this.changeSmall(index)
                    break;
                case "清":
                    this.changeClear(index)
                    break;

            }
        

        
    }

    changeChooseStatus(index1,index2){
        if(index1 != null){
            this.common.btn = this.common.btn.map((item,index) => {
                if(index == index1){
                    let ele = item.map((todo,order) => order == index2 ? {...todo,flag:true}:{...todo,flag:false})
                    return ele
                }else{
                    return item
                }
          })
        }else{
            this.common.singleBtn = this.common.singleBtn.map((item,index) => {
                 if(index2 == index)
                    return {...item, flag:true}
                 else
                    return {...item, flag:false}   
            })
            console.log(this.common.singleBtn)
        }
        
    }


    // 重置选球数据
    resetData(){
        this.common.ballData = this.common.ballData.map(item => {
            let balls = item.value.map(ele => 0)
            item.value = balls
            return item
        })
        this.common.calculate()
    }

    changeAll(line){
        //this.ballData
        console.log(line)
        if(line != null) {
            this.common.ballData = this.common.ballData.map((item,index) => {
            if(index == line){
                item.value = item.value.map(ele => 1)
                return item
            }else{
                return item
            }
           })
        }else{
            this.common.ballData = this.common.ballData.map((item,index) => {
                 let temp = item.map(ele => 1)
                 return temp
            })
            console.log(this.common.ballData)
        }
       
    }

    changeClear(line){
        //this.ballData
        console.log(line)
        this.common.ballData = this.common.ballData.map((item,index) => {
            if(index == line){
                item.value = item.value.map(ele => 0)
                return item
            }else{
                return item
            }
        })
    }

    changeBig(line){
        if(line != null) {
            this.common.ballData = this.common.ballData.map((item,index) => {
            if(index == line){
                item.value = item.value.map((ele,index) => index > 4? 1:0)
                return item
            }else{
                return item
            }
           })
        }else{
             let total = this.common.ballData.reduce((prev,next) => {

                 return prev + next.length
             },0)
             console.log(total)
             this.common.ballData = this.common.ballData.map((item,index) => {
                item = item.map((ele,index2) => index*item.length + index2 > total/2 ? 1:0)
                return item
                
            })
        }   
    }

    changeSmall(line){
        if(line != null) {
             this.common.ballData = this.common.ballData.map((item,index) => {
            if(index == line){
                item.value = item.value.map((ele,index) => index > 4? 0:1)
                return item
            }else{
                return item
            }
          })
        }else{
             let total = this.common.ballData.reduce((prev,next) => {

                 return prev + next.length
             },0)
             console.log(total)
             this.common.ballData = this.common.ballData.map((item,index) => {
                item = item.map((ele,index2) => index*item.length + index2 < total/2 ? 1:0)
                return item
                
            })
        }
       
    }

    changeOdd(line){
        if(line != null){
            this.common.ballData = this.common.ballData.map((item,index) => {
            if(index == line){
                item.value = item.value.map((ele,index) => index %2 == 0? 0 : 1)
                return item
            }else{
                return item
            }
          })
        }else{
            let total = this.common.ballData.reduce((prev,next) => {

                 return prev + next.length
             },0)
             console.log(total)
             this.common.ballData = this.common.ballData.map((item,index) => {
                item = item.map((ele,index2) => (index*item.length + index2) % 2 ? 1:0)
                return item
                
            })
        }
       
    }

    changeEven(line){
        if(line != null){
            this.common.ballData = this.common.ballData.map((item,index) => {
                if(index == line){
                    item.value = item.value.map((ele,index) => index %2 == 0? 1 : 0)
                    return item
                }else{
                    return item
                }
            })
        }else{
             this.common.ballData = this.common.ballData.map((item,index) => {
                item = item.map((ele,index2) => (index*item.length + index2) % 2 ? 0:1)
                return item
                
            })
        }
        
    }

    changeHeZhi(){

    }

   
   processOrder(name?){
    let dataArr = []
    this.common.ballData.forEach(item => {
         let arr = []
         item.value.forEach((ele,index) => {
              ele == 1 ? arr.push(('0'+index).slice(-2)):''
         })
         dataArr.push(arr.join(' '))
    })
    console.log(dataArr)
    // dataArr = dataArr.map(item => item.join(''))
   
    return {
         betData:dataArr,
         gameName:name?name:this.common.method + this.common.smallMethod,
         count:this.common.count,
         price:this.common.betPrice
    }
  }

     // 机选注单
   randomChoose(number?){
       console.log("vibrate" in navigator)
       navigator.vibrate(3000)
    this.common.ballData = this.common.ballData.map(item => {
        // let arr = [0,1,2,3,4,5,6,7,8,9]
        let random = Math.floor(Math.random()*10)
        //let arr = this.generateTwo(number)
        let balls = item.value.map((ele,index) => index == random ? 1 : 0)
        item.value = balls
        return item
    })
    this.common.calculate()
  }

   shakePhone(func:Function){
     var speed = 15;    // 用来判定的加速度阈值，太大了则很难触发
     var x, y, z, lastX, lastY, lastZ;
     x = y = z = lastX = lastY = lastZ = 0;

     window.addEventListener('devicemotion', (event) => {
        var acceleration = event.accelerationIncludingGravity;
        x = acceleration.x;
        y = acceleration.y;
        //alert(this.shake)
        if((Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed) && !this.shake)  {
            // 用户设备摇动了，触发响应操作
            // 此处的判断依据是用户设备的加速度大于我们设置的阈值
            //alert('摇了');
            this.shake = true;
            new Observable(observer => {
                setTimeout(() => {
                  observer.next();
                   }, 500);
            }).subscribe(value => {
                  func.bind(this)()
                  this.vibration.vibrate(1000)
                  this.shake = false
                  
            })
        }
        lastX = x;
        lastY = y;
    }, false);
  }

}
