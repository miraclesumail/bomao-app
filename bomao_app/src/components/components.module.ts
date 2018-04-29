import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { GamemenuComponent } from './gamemenu/gamemenu';
import { TabYuanComponent } from './tab-yuan/tab-yuan';
import { RightmenuComponent } from './rightmenu/rightmenu';
import { MenumodalComponent } from './menumodal/menumodal';

@NgModule({
	declarations: [GamemenuComponent,
    TabYuanComponent,
    RightmenuComponent,
    MenumodalComponent
    ],
	imports: [CommonModule],
	exports: [GamemenuComponent,
    TabYuanComponent,
    RightmenuComponent,
    MenumodalComponent
    ]
})
export class ComponentsModule {}
