import { Scene } from 'phaser';
import { textFade } from '../js/common';

export class Choice extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    msg_text_1 : Phaser.GameObjects.Text;
    msg_text_2 : Phaser.GameObjects.Text;
    rest : Phaser.GameObjects.Text;
    norest : Phaser.GameObjects.Text;
    level: string;
    playerUsedSpark: boolean;
    playerMadeRest: boolean;
    playerWasOnWeak: boolean;

    constructor ()
    {
        super('Choice');
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

        textFade(this.msg_text_1, 100, 'Your travel was long, you feel really tired', 0, this)
        textFade(this.msg_text_2, 180, 'You know, rest sounds reasonable', 2000, this)
        textFade(this.msg_text_2, 260, 'However, the consequences are more than likely', 4000, this)
        textFade(this.msg_text_2, 340, 'What do you choose?', 6000, this)

        setTimeout(() => {
            this.rest = this.make.text({
                x: window.innerWidth/2,
                y: 700,
                text: 'Rest',
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

                this.scene.start('lvl16', {
                    usedSpark: this.playerUsedSpark,
                    rest: true,
                    wasOnWeak: this.playerWasOnWeak
                });
    
            });

            this.norest = this.make.text({
                x: window.innerWidth/2,
                y: 800,
                text: 'No rest',
                origin: { x: 0.5, y: 0.5 },
                style:  {
                    fontFamily: 'Arial Black', fontSize: 70, color: '#ffffff',
                    stroke: '#000000', strokeThickness: 4,
                    align: 'left'
                },
                alpha: 0,
            });

            this.tweens.add({
                targets: this.norest,
                alpha: { from: 0, to: 1 },
                ease: 'Sine.InOut',
                duration: 2000,
                repeat: 0,
            });

            
            this.norest.setInteractive()

            this.norest.on(
                "pointerover",
                () => {
                    this.norest.scaleX = 1.1
                    this.norest.scaleY = 1.1
                }
            );

            this.norest.on(
                "pointerout",
                () => {
                    this.norest.scaleX = 1
                    this.norest.scaleY = 1
                }
            );

            this.norest.once('pointerdown', () => {

                this.scene.start('lvl16', {
                    usedSpark: this.playerUsedSpark,
                    rest: false,
                    wasOnWeak: this.playerWasOnWeak
                });
    
            });
        }, 8000)
    }
}
