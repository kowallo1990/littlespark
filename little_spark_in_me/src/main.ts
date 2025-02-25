import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { Hurt } from './scenes/Hurt';
import { HurtEnemy } from './scenes/HurtEnemy';
import { LvlPrototype } from './scenes/LvlPrototype'
import { Weaker } from './scenes/Weaker';
import { Lvl1 } from './scenes/lvls/Lvl1';
import { Lvl2 } from './scenes/lvls/Lvl2';
import { Lvl3 } from './scenes/lvls/Lvl3';
import { Lvl4 } from './scenes/lvls/Lvl4';
import { Lvl5 } from './scenes/lvls/Lvl5';
import { Lvl6 } from './scenes/lvls/Lvl6';
import { Lvl7 } from './scenes/lvls/Lvl7';
import { Lvl8 } from './scenes/lvls/Lvl8';
import { Lvl9 } from './scenes/lvls/Lvl9';
import { Lvl10 } from './scenes/lvls/Lvl10';
import { Lvl11 } from './scenes/lvls/Lvl11';
import { Lvl12 } from './scenes/lvls/Lvl12';
import { Lvl13 } from './scenes/lvls/Lvl13';
import { Lvl14 } from './scenes/lvls/Lvl14';
import { Lvl15 } from './scenes/lvls/Lvl15';
import { Lvl16 } from './scenes/lvls/Lvl16';
import { Lvl17 } from './scenes/lvls/Lvl17';
import { Lvl18 } from './scenes/lvls/Lvl18';
import { Lvl19 } from './scenes/lvls/Lvl19';
import { Lvl20 } from './scenes/lvls/Lvl20';

import { Game, Types } from "phaser";

const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    backgroundColor: 'black',
    physics: {
        default: "arcade",
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver,
        Hurt,
        HurtEnemy,
        Weaker,
        LvlPrototype,
        Lvl1,
        Lvl2,
        Lvl3,
        Lvl4,
        Lvl5,
        Lvl6,
        Lvl7,
        Lvl8,
        Lvl9,
        Lvl10,
        Lvl11,
        Lvl12,
        Lvl13,
        Lvl14,
        Lvl15,
        Lvl16,
        Lvl17,
        Lvl18,
        Lvl19,
        Lvl20,
    ]
};

export default new Game(config);
