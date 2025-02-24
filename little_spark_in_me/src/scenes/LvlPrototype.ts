import { Scene, GameObjects } from 'phaser';

export class LvlPrototype extends Scene
{
        constructor (key: string)
    {
        super(key);
    }

    create ()
    {
    }

    constructTheSceene(playerCanMove: boolean) {
        let camera = this.cameras.main;
        camera.setBackgroundColor('#fff')

        let black = this.make.image({
            x: window.innerWidth/2,
            y: window.innerHeight/2,
            key: 'dark',
            scale : {
                x: 1 * window.innerWidth/1920,
                y: 1 * window.innerHeight/1080
            },
        });

        black.depth = 100;

        const useTheSpark = () => {
            playerCanMove = false
            
            this.tweens.add({
                targets: black,
                alpha: { from: 1, to: 0 },
                ease: 'Sine.InOut',
                duration: 500,
                repeat: 0,
            });
    
            this.tweens.add({
                targets: black,
                alpha: { from: 0, to: 1 },
                ease: 'Sine.InOut',
                duration: 2000,
                repeat: 0,
                onComplete: () => {
                    playerCanMove = true
                }
            });
        }

        this.input.keyboard.on('keydown-SPACE', () => {
            if (playerCanMove) {
                useTheSpark()
            } 
        })
    }
}
