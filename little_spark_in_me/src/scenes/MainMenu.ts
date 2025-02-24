import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    new: GameObjects.Image;
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

        this.new = this.make.image({
            x: window.innerWidth/2,
            y: window.innerHeight/2,
            key: 'new',
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
    }
}
