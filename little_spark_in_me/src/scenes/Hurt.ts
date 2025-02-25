import { Scene } from 'phaser';
import { textFade } from '../js/common';

export class Hurt extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    msg_text_1 : Phaser.GameObjects.Text;
    msg_text_2 : Phaser.GameObjects.Text;
    continue : Phaser.GameObjects.Text;
    level: string;
    playerUsedSpark: boolean;
    playerMadeRest: boolean;

    constructor ()
    {
        super('Hurt');
    }

    init (data: any)
    {
        this.level = data.lvl;
        this.playerUsedSpark = data.usedSpark ? data.usedSpark :  false;
        this.playerMadeRest = data.rest ? data.rest : false;
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor('#000')

        textFade(this.msg_text_1, 100, 'Living in the dark can be dangerous, you got hurt', 0, this)
        textFade(this.msg_text_2, 180, 'You should be more carefull', 2000, this)

        setTimeout(() => {
            this.continue = this.make.text({
                x: window.innerWidth/2,
                y: 700,
                text: 'Continue',
                origin: { x: 0.5, y: 0.5 },
                style:  {
                    fontFamily: 'Arial Black', fontSize: 70, color: '#ffffff',
                    stroke: '#000000', strokeThickness: 4,
                    align: 'left'
                },
                alpha: 0,
            });

            this.tweens.add({
                targets: this.continue,
                alpha: { from: 0, to: 1 },
                ease: 'Sine.InOut',
                duration: 2000,
                repeat: 0,
            });

            
            this.continue.setInteractive()

            this.continue.on(
                "pointerover",
                () => {
                    this.continue.scaleX = 1.1
                    this.continue.scaleY = 1.1
                }
            );

            this.continue.on(
                "pointerout",
                () => {
                    this.continue.scaleX = 1
                    this.continue.scaleY = 1
                }
            );

            this.continue.once('pointerdown', () => {

                this.scene.start(this.level, {
                    usedSpark: this.playerUsedSpark,
                    rest: this.playerMadeRest
                });
    
            });
        }, 4000)
    }
}
