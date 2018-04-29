import * as $ from 'jquery';
import { CommonProvider } from './providers/common/common'
import { GamemenuComponent } from './components/gamemenu/gamemenu'


let tt = 0;

function easeOutCubic(t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
}

export class Effect{


    constructor(public common:CommonProvider, public gamemenu:GamemenuComponent){
        let self = this;
        $(document).on('click','.body-bg',function(){
            if(self.common.visible = 'visable'){
                console.log('fff');self.gamemenu.toggle()
            }
        });
        //this.addDynamicComponent()
    }

    move(){
        tt += 1000/60;
        let width = document.getElementById('bet-statistic').offsetWidth
        let ball = document.getElementById('ball');
        if(tt < 600){
            let left = Math.ceil(easeOutCubic(tt,50,width,600))
            ball.style.left = left + 'px'

            // let high = -(width*(left - 150 ) -((left - 150)*(left - 150)))/500;
            let high = width*width/1200
            let top = -(width - left + 50)*(left -50)/200
            // y = -(x- width)x/300 = (width - left + 150)(left -150)/300   high = width*width/1200
            ball.style.top =  top  + 'px'
            if(Math.abs(top)>=high){
                let time = 600 - tt
                $('#ball').animate({width:0,height:0},time,function(){
                    console.log('finish')
                })
            }
            top = Math.abs(high)

            requestAnimationFrame(this.move.bind(this))
        }else{
            console.log('wwww')
            this.common.cartNumber++
            $('#ball').remove()
            tt = 0
        }
    }

}