import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    new: Phaser.GameObjects.Text;
    controls: Phaser.GameObjects.Text;
    title: GameObjects.Text;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.make.image({
            x: window.innerWidth/2,
            y: window.innerHeight/2,
            key: 'menu',
            scale : {
                x: 1 * window.innerWidth/1920,
                y: 1 * window.innerHeight/1080
            },
        });

        this.new = this.make.text({
            x: window.innerWidth/2,
            y: window.innerHeight/2,
            text: 'New Game',
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

            this.scene.start('Game');

        });

        this.controls = this.make.text({
            x: window.innerWidth/2,
            y: window.innerHeight/2+60,
            text: 'Controls',
            origin: { x: 0.5, y: 0.5 },
            style:  {
                fontFamily: 'Arial Black', fontSize: 40, color: '#ffffff',
                stroke: '#000000', strokeThickness: 4,
                align: 'left'
            },
        });

        this.controls.setInteractive()

        this.controls.on(
            "pointerover",
            () => {
                this.controls.scaleX = 1.1
                this.controls.scaleY = 1.1
            }
        );

        this.controls.on(
            "pointerout",
            () => {
                this.controls.scaleX = 1
                this.controls.scaleY = 1
            }
          );

        this.controls.once('pointerdown', () => {

            this.scene.start('Controls');

        });
    }
}
