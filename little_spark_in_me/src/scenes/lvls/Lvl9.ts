import { LvlPrototype } from '../LvlPrototype'

export class Lvl9 extends LvlPrototype
{
    text: any; 
    playerCanMove: boolean = true;
    platforms: any;
    player: any;
    kid: any;
    cursors: any;
    enemy: any;
    enemyBlocksLeft: any;
    enemyBlocksRight: any;

    constructor ()
    {
        super('lvl9', true);
    }

    create ()
    {
        this.text = this.add.text(this.makeScale(100), this.makeScale(100), 'Level 9', { fontSize: '32px', color: '#fff' });
        this.text.depth = 101
        
        this.constructTheSceene()

        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(window.innerWidth/2, window.innerHeight, 'ground_long').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(450), window.innerHeight - this.makeScale(120), 'ground_short').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(650), window.innerHeight - this.makeScale(220), 'ground_short').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(850), window.innerHeight - this.makeScale(320), 'ground_short').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(1250), window.innerHeight - this.makeScale(420), 'ground_short').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(1000), window.innerHeight - this.makeScale(530), 'ground_short').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(850), window.innerHeight - this.makeScale(600), 'ground_short').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(600), window.innerHeight - this.makeScale(700), 'ground_short').setScale(this.makeScale(1)).refreshBody();

        this.player = this.physics.add.sprite(this.makeScale(100), window.innerHeight - this.makeScale(100), 'player').setScale(this.makeScale(1));
        this.makePlayer(this.player)

        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard.createCursorKeys()

        this.kid  = this.physics.add.sprite(this.makeScale(600), this.makeScale(220), 'kid').setScale(this.makeScale(1));
        this.makePlayer(this.kid);
        this.physics.add.collider(this.kid, this.platforms);

        this.physics.add.overlap(this.player, this.kid, () => {
            this.scene.start('lvl10', {
                usedSpark: this.playerUsedSpark,
                rest: this.playerMadeRest
            });
        }, null, this);

        //enemy
        this.createEnemyAnimation()

        this.enemy = this.physics.add.sprite(this.makeScale(850), this.makeScale(300), 'enemy').setScale(this.makeScale(0.7)).refreshBody();
        this.makePlayer(this.enemy)

        this.physics.add.collider(this.enemy, this.platforms);
        this.enemy.setVelocityX(-160)

        this.physics.add.overlap(this.enemy, this.player, () => {
            this.scene.start('HurtEnemy', { 
                lvl: 'lvl9',
                usedSpark: this.playerUsedSpark,
                rest: this.playerMadeRest
            });
        }, null, this);



        this.createEnemyBoundaries(this.enemy, this.enemyBlocksLeft, this.enemyBlocksRight, this.makeScale(700), window.innerHeight-this.makeScale(650), this.makeScale(1000), window.innerHeight-this.makeScale(650))
    }

    update() {
        this.createMovement(this.player, this.cursors)
    }
}