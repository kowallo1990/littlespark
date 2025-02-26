import { LvlPrototype } from '../LvlPrototype'

export class Lvl17 extends LvlPrototype
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
        super('lvl17', true);
    }

    create ()
    {
        this.text = this.add.text(this.makeScale(100), this.makeScale(100), 'Level 17', { fontSize: '32px', color: '#fff' });
        this.text.depth = 101
        
        this.constructTheSceene(this.playerMadeRest ? 700 : 1200)

        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(window.innerWidth/2, window.innerHeight, 'ground_long').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(window.innerWidth/2 - this.makeScale(310), window.innerHeight-this.makeScale(110), 'obstacle_high').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(window.innerWidth/2 + this.makeScale(310), window.innerHeight-this.makeScale(110), 'obstacle_high').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(window.innerWidth/2 + this.makeScale(310), window.innerHeight-this.makeScale(310), 'obstacle_high').setScale(this.makeScale(1)).refreshBody();

        this.platforms.create(window.innerWidth/2 - this.makeScale(350), window.innerHeight - this.makeScale(90), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(window.innerWidth/2 + this.makeScale(220), window.innerHeight - this.makeScale(90), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(window.innerWidth/2 + this.makeScale(270), window.innerHeight - this.makeScale(190), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(window.innerWidth/2 + this.makeScale(220), window.innerHeight - this.makeScale(290), 'obsticle').setScale(this.makeScale(1)).refreshBody();

        this.player = this.physics.add.sprite(this.makeScale(100), window.innerHeight - this.makeScale(100), 'player').setScale(this.makeScale(1));
        this.makePlayer(this.player)

        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard.createCursorKeys()

        this.kid  = this.physics.add.sprite(window.innerWidth - this.makeScale(100), window.innerHeight - this.makeScale(100), 'kid').setScale(this.makeScale(1));
        this.makePlayer(this.kid);
        this.physics.add.collider(this.kid, this.platforms);

        this.physics.add.overlap(this.player, this.kid, () => {
            this.scene.start(this.playerMadeRest ? 'BadEnding' : 'lvl18', {
                usedSpark: this.playerUsedSpark,
                rest: this.playerMadeRest,
                wasOnWeak: this.playerWasOnWeak
            });
        }, null, this);

        //enemy
        this.createEnemyAnimation()

        this.enemy = this.physics.add.sprite(this.makeScale(900), window.innerHeight - this.makeScale(100), 'enemy').setScale(this.makeScale(1)).refreshBody();
        this.makePlayer(this.enemy)

        this.physics.add.collider(this.enemy, this.platforms);
        this.enemy.setVelocityX(-160)

        this.physics.add.overlap(this.enemy, this.player, () => {
            this.scene.start('HurtEnemy', { 
                lvl: 'lvl17',
                usedSpark: this.playerUsedSpark,
                rest: this.playerMadeRest,
            });
        }, null, this);



        this.createEnemyBoundaries(this.enemy, this.enemyBlocksLeft, this.enemyBlocksRight, window.innerWidth/2-this.makeScale(300), window.innerHeight-this.makeScale(50), window.innerWidth/2+this.makeScale(200), window.innerHeight-this.makeScale(50))
    }

    update() {
        this.createMovement(this.player, this.cursors)
    }
}