import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    msg_text_1 : Phaser.GameObjects.Text;
    msg_text_2 : Phaser.GameObjects.Text;
    msg_text_3 : Phaser.GameObjects.Text;
    msg_text_4 : Phaser.GameObjects.Text;
    msg_text_5 : Phaser.GameObjects.Text;
    msg_text_6 : Phaser.GameObjects.Text;
    continue : Phaser.GameObjects.Text;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor('#000')

        const textFade = (textObj:Phaser.GameObjects.Text, yPosition: number, text: string, time: number) => {
            setTimeout(() => {
                textObj = this.make.text({
                    x: window.innerWidth/2,
                    y: yPosition,
                    text: text,
                    origin: { x: 0.5, y: 0.5 },
                    style:  {
                        fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
                        stroke: '#000000', strokeThickness: 4,
                        align: 'left'
                    },
                    alpha: 0,
                });
        
                this.tweens.add({
                    targets: textObj,
                    alpha: { from: 0, to: 1 },
                    ease: 'Sine.InOut',
                    duration: 2000,
                    repeat: 0,
                });
            }, time)
        }

        textFade(this.msg_text_1, 100, 'You are a creature of darkness, existing without light and warmth.', 0)
        textFade(this.msg_text_2, 180, 'You lived quietly with your family, on the sidelines, not bothering anyone.', 2000)
        textFade(this.msg_text_3, 260, 'Not all denizens of darkness adhere to the same principles.', 4000)
        textFade(this.msg_text_4, 340, 'You were attacked, the mother of your children died, and they were scattered across the land.', 6000)
        textFade(this.msg_text_5, 420, 'You set out into the unknown in search of the missing', 8000)
        textFade(this.msg_text_6, 500, 'Luckily for you, you have something that others don\'t, a little spark of light...', 10000)

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

                this.scene.start('lvl1');
    
            });
        }, 12000)
    }
}
