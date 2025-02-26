import { LvlPrototype } from '../LvlPrototype'

export class Lvl15 extends LvlPrototype
{
    text: any; 
    playerCanMove: boolean = true;
    platforms: any;
    player: any;
    kid: any;
    cursors: any;
    spikes: any;
    enemy: any;
    enemyBlocksLeft: any;
    enemyBlocksRight: any;

    constructor ()
    {
        super('lvl15', true);
    }

    create ()
    {
        this.text = this.add.text(this.makeScale(100), this.makeScale(100), 'Level 15', { fontSize: '32px', color: '#fff' });
        this.text.depth = 101
        
        this.constructTheSceene(this.playerWasOnWeak ? 1200 : 2500)

        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(window.innerWidth/2, window.innerHeight, 'ground_long').setScale(this.makeScale(1)).refreshBody();

        this.player = this.physics.add.sprite(this.makeScale(100), window.innerHeight - this.makeScale(100), 'player').setScale(this.makeScale(1));
        this.makePlayer(this.player)

        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard.createCursorKeys()

        this.kid  = this.physics.add.sprite(window.innerWidth - this.makeScale(100), window.innerHeight - this.makeScale(100), 'kid').setScale(this.makeScale(1));
        this.makePlayer(this.kid);
        this.physics.add.collider(this.kid, this.platforms);

        this.physics.add.overlap(this.player, this.kid, () => {
            this.scene.start(this.playerWasOnWeak ? 'Choice' : 'lvl16', {
                usedSpark: this.playerUsedSpark,
                rest: this.playerMadeRest,
                wasOnWeak: this.playerWasOnWeak
            });
        }, null, this);

        //spikes

        this.spikes = this.physics.add.group({
            key: 'spikes',
            repeat: 7,
            setXY: { x: this.makeScale(300), y:  window.innerHeight - this.makeScale(50), stepX: 250 }
        });

        this.physics.add.overlap(this.player, this.spikes, () => {
            this.scene.start('Hurt', { 
                lvl: 'lvl15',
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
                lvl: 'lvl15',
                usedSpark: this.playerUsedSpark,
                rest: this.playerMadeRest,
                wasOnWeak: this.playerWasOnWeak
            });
        }, null, this);

        this.createEnemyBoundaries(this.enemy, this.enemyBlocksLeft, this.enemyBlocksRight, 0, window.innerHeight-this.makeScale(50), window.innerWidth - this.makeScale(100), window.innerHeight-this.makeScale(50))

    }

    update() {
        this.createMovement(this.player, this.cursors)
    }
}