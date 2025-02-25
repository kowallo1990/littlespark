import { Scene } from 'phaser';

export class LvlPrototype extends Scene
{
        playerCanMove: boolean;
        playerUsedSpark: boolean;
        playerMadeRest: boolean;

        constructor (key: string, playerMove: boolean)
    {
        super(key);
        this.playerCanMove= playerMove;
    }

    init (data: any)
    {
        this.playerUsedSpark = data.usedSpark ? data.usedSpark :  false;
        this.playerMadeRest = data.rest ? data.rest : false;
    }

    create ()
    {
    }

    useTheSpark(black: any, time: number) {
        if (!this.playerCanMove) return 

        this.playerUsedSpark = true;

        this.playerCanMove = false

        this.tweens.add({
            targets: black,
            alpha: { from: 1, to: 0 },
            ease: 'Sine.InOut',
            duration: 500,
            repeat: 0,
            onComplete: () => {
                this.tweens.add({
                    targets: black,
                    alpha: { from: 0, to: 1 },
                    ease: 'Sine.InOut',
                    duration: time-500,
                    repeat: 0,
                });
            }
        });

        setTimeout(() => {
            this.playerCanMove = true
        }, time)
    }

    constructTheSceene(time:number = 2000) {
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

        this.input.keyboard.on('keydown-SPACE', () => {
            this.useTheSpark(black, time)
        })
    }

    makePlayer(player: any) {
        player.setCollideWorldBounds(true);
        player.body.setGravityY(300)
    }
    
    createMovement(player: any, cursors: any) {
        if(player && cursors) {
            if (cursors.left.isDown 
                // && this.playerCanMove
            )
                {
                    player.setVelocityX(-500);
                }
            else if (cursors.right.isDown 
                // && this.playerCanMove
            )
                {
                    player.setVelocityX(500);
                }
            else
                {
                    player.setVelocityX(0);
                }
            
            if (cursors.up.isDown && player.body.touching.down 
                // && this.playerCanMove
            )
                {
                    player.setVelocityY(-330);
                }
        }
    }

    createEnemyAnimation() {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('enemy_right', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: -1
        });
    }

    createEnemyBoundaries(enemy: any, enemyBlocksLeft: any, enemyBlocksRight: any, leftX: number, leftY: number, rightX: number, rightY: number) {
        enemyBlocksLeft = this.physics.add.staticGroup()
        enemyBlocksLeft.create(leftX,leftY, 'aaa').setScale(this.makeScale(1)).refreshBody();
        this.physics.add.collider(enemy, enemyBlocksLeft, () => {
            enemy.setVelocityX(160)
        });

        enemyBlocksRight = this.physics.add.staticGroup()
        enemyBlocksRight.create(rightX, rightY, 'aaa').setScale(this.makeScale(1)).refreshBody();
        this.physics.add.collider(enemy, enemyBlocksRight, () => {
            enemy.setVelocityX(-160)
        });        
    }


    makeScale(size: number) {
        return size * window.innerWidth/1920
    }
}
