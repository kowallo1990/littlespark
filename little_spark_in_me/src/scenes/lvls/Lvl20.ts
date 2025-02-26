import { LvlPrototype } from '../LvlPrototype'

export class Lvl20 extends LvlPrototype
{
    text: any; 
    playerCanMove: boolean = true;
    platforms: any;
    player: any;
    kid: any;
    cursors: any;
    spikes: any;

    constructor ()
    {
        super('lvl20', true);
    }

    create ()
    {
        this.text = this.add.text(this.makeScale(100), this.makeScale(100), 'Level 20', { fontSize: '32px', color: '#fff' });
        this.text.depth = 101
        
        this.constructTheSceene(500, false)

        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(window.innerWidth/2, window.innerHeight, 'ground_long').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(window.innerWidth/2 - this.makeScale(400), window.innerHeight-this.makeScale(110), 'obstacle_high').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(window.innerWidth/2 - this.makeScale(400), window.innerHeight-this.makeScale(310), 'obstacle_high').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(window.innerWidth/2 - this.makeScale(400), window.innerHeight-this.makeScale(510), 'obstacle_high').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(window.innerWidth/2 - this.makeScale(300), window.innerHeight-this.makeScale(510), 'ground_short').setScale(this.makeScale(1)).refreshBody();

        this.platforms.create(window.innerWidth/2 - this.makeScale(520), window.innerHeight - this.makeScale(90), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(window.innerWidth/2 - this.makeScale(570), window.innerHeight - this.makeScale(190), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(window.innerWidth/2 - this.makeScale(520), window.innerHeight - this.makeScale(290), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(window.innerWidth/2 - this.makeScale(570), window.innerHeight - this.makeScale(390), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(window.innerWidth/2 - this.makeScale(520), window.innerHeight - this.makeScale(490), 'obsticle').setScale(this.makeScale(1)).refreshBody();


        this.player = this.physics.add.sprite(this.makeScale(100), window.innerHeight - this.makeScale(100), 'player').setScale(this.makeScale(1));
        this.makePlayer(this.player)

        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard.createCursorKeys()

        this.kid  = this.physics.add.sprite(window.innerWidth - this.makeScale(100), window.innerHeight - this.makeScale(100), 'player').setScale(this.makeScale(1));
        this.makePlayer(this.kid);
        this.physics.add.collider(this.kid, this.platforms);

        this.physics.add.overlap(this.player, this.kid, () => {
            this.scene.start('BestEnding', {
                usedSpark: this.playerUsedSpark,
                rest: this.playerMadeRest,
                wasOnWeak: this.playerWasOnWeak
            });
        }, null, this);

        //spikes

        this.spikes = this.physics.add.group({
            key: 'spikes',
            repeat: 6,
            setXY: { x: window.innerWidth/2 + this.makeScale(100), y:  window.innerHeight - this.makeScale(50), stepX: 100 }
        });

        this.spikes.create(window.innerWidth, window.innerHeight - this.makeScale(50), 'spikes').setScale(this.makeScale(1)).refreshBody();


        this.physics.add.overlap(this.player, this.spikes, () => {
            this.scene.start('Hurt', { 
                lvl: 'lvl20',
                usedSpark: this.playerUsedSpark,
                rest: this.playerMadeRest,
                wasOnWeak: this.playerWasOnWeak
                });
        }, null, this);
    }

    update() {
        this.createMovement(this.player, this.cursors)
    }
}