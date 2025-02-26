import { Scene } from 'phaser';
import { textFade } from '../js/common';

export class BestEnding extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    msg_text_1 : Phaser.GameObjects.Text;
    msg_text_2 : Phaser.GameObjects.Text;
    rest : Phaser.GameObjects.Text;
    level: string;
    playerUsedSpark: boolean;
    playerMadeRest: boolean;
    playerWasOnWeak: boolean;

    constructor ()
    {
        super('BestEnding');
    }

    init (data: any)
    {
        this.level = data.lvl;
        this.playerUsedSpark = data.usedSpark ? data.usedSpark :  false;
        this.playerMadeRest = data.rest ? data.rest : false;
        this.playerWasOnWeak = data.wasOnWeak ? data.wasOnWeak : false
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor('#000')

        textFade(this.msg_text_1, 100, 'Your wife and kids are safe', 0, this)
        textFade(this.msg_text_2, 180, 'Your family is back together', 2000, this)
        textFade(this.msg_text_2, 260, 'The effort paid off', 4000, this)

        setTimeout(() => {
            this.rest = this.make.text({
                x: window.innerWidth/2,
                y: 700,
                text: 'Main menu',
                origin: { x: 0.5, y: 0.5 },
                style:  {
                    fontFamily: 'Arial Black', fontSize: 70, color: '#ffffff',
                    stroke: '#000000', strokeThickness: 4,
                    align: 'left'
                },
                alpha: 0,
            });

            this.tweens.add({
                targets: this.rest,
                alpha: { from: 0, to: 1 },
                ease: 'Sine.InOut',
                duration: 2000,
                repeat: 0,
            });

            
            this.rest.setInteractive()

            this.rest.on(
                "pointerover",
                () => {
                    this.rest.scaleX = 1.1
                    this.rest.scaleY = 1.1
                }
            );

            this.rest.on(
                "pointerout",
                () => {
                    this.rest.scaleX = 1
                    this.rest.scaleY = 1
                }
            );

            this.rest.once('pointerdown', () => {

                this.scene.start('MainMenu');
    
            });

            
        }, 6000)
    }
}
