import { Scene, GameObjects } from 'phaser';

export class Controls extends Scene
{
    background: GameObjects.Image;
    new: Phaser.GameObjects.Text;
    title: GameObjects.Text;

    constructor ()
    {
        super('Controls');
    }

    create ()
    {
        this.background = this.make.image({
            x: window.innerWidth/2,
            y: window.innerHeight/2-100,
            key: 'instruction',
            scale : {
                x: 1 * window.innerWidth/1920,
                y: 1 * window.innerHeight/1080
            },
        });

        this.new = this.make.text({
            x: window.innerWidth/2,
            y: window.innerHeight/2 + 100,
            text: 'Main menu',
            origin: { x: 0.5, y: 0.5 },
            style:  {
                fontFamily: 'Arial Black', fontSize: 40, color: '#ffffff',
                stroke: '#000000', strokeThickness: 4,
                align: 'left'
            },
        });

        this.new.setInteractive()

        this.new.on(
            "pointerover",
            () => {
                this.new.scaleX = 1.1
                this.new.scaleY = 1.1
            }
        );

        this.new.on(
            "pointerout",
            () => {
                this.new.scaleX = 1
                this.new.scaleY = 1
            }
          );

        this.new.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}
