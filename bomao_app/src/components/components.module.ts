import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { GamemenuComponent } from './gamemenu/gamemenu';
import { TabYuanComponent } from './tab-yuan/tab-yuan';
import { RightmenuComponent } from './rightmenu/rightmenu';
import { MenumodalComponent } from './menumodal/menumodal';
import { Zuxuan120Component } from './ssc-game/zuxuan120/zuxuan120';
import { Zuxuan60Component } from './ssc-game/zuxuan60/zuxuan60';
import { HouerdaxiaodanshuangComponent } from './ssc-game/houerdaxiaodanshuang/houerdaxiaodanshuang';

@NgModule({
	declarations: [GamemenuComponent,
    TabYuanComponent,
    RightmenuComponent,
    MenumodalComponent,
    Zuxuan120Component,
    Zuxuan60Component,
    HouerdaxiaodanshuangComponent
    ],
	imports: [CommonModule],
	exports: [GamemenuComponent,
    TabYuanComponent,
    RightmenuComponent,
    MenumodalComponent,
    Zuxuan120Component,
    Zuxuan60Component,
    HouerdaxiaodanshuangComponent
    ]
})
export class ComponentsModule {}
