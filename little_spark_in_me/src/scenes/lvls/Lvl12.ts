import { LvlPrototype } from '../LvlPrototype'

export class Lvl12 extends LvlPrototype
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
        super('lvl12', true);
    }

    create ()
    {
        this.text = this.add.text(this.makeScale(100), this.makeScale(100), 'Level 12', { fontSize: '32px', color: '#fff' });
        this.text.depth = 101
        
        this.constructTheSceene(1200)

        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(window.innerWidth/2, window.innerHeight, 'ground_long').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(300), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(300), window.innerHeight - this.makeScale(90), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(300), window.innerHeight - this.makeScale(60), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(400), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(500), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(600), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(700), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(800), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(900), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(1000), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(1100), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(1200), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(1300), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(1400), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(1500), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(1600), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(1700), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();

        this.player = this.physics.add.sprite(this.makeScale(100), window.innerHeight - this.makeScale(100), 'player').setScale(this.makeScale(1));
        this.makePlayer(this.player)

        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard.createCursorKeys()

        this.kid  = this.physics.add.sprite(window.innerWidth - this.makeScale(100), window.innerHeight - this.makeScale(100), 'kid').setScale(this.makeScale(1));
        this.makePlayer(this.kid);
        this.physics.add.collider(this.kid, this.platforms);

        this.physics.add.overlap(this.player, this.kid, () => {
            this.scene.start('lvl13', {
                usedSpark: this.playerUsedSpark,
                rest: this.playerMadeRest
            });
        }, null, this);

        
        // spikes
        this.spikes = this.physics.add.staticGroup()

        this.spikes.create(this.makeScale(300), window.innerHeight - this.makeScale(50), 'spikes').setScale(this.makeScale(1)).refreshBody();
        this.spikes.create(this.makeScale(500), window.innerHeight - this.makeScale(50), 'spikes').setScale(this.makeScale(1)).refreshBody();
        this.spikes.create(this.makeScale(700), window.innerHeight - this.makeScale(50), 'spikes').setScale(this.makeScale(1)).refreshBody();
        this.spikes.create(this.makeScale(800), window.innerHeight - this.makeScale(50), 'spikes').setScale(this.makeScale(1)).refreshBody();
        this.spikes.create(this.makeScale(1100), window.innerHeight - this.makeScale(50), 'spikes').setScale(this.makeScale(1)).refreshBody();
        this.spikes.create(this.makeScale(1200), window.innerHeight - this.makeScale(50), 'spikes').setScale(this.makeScale(1)).refreshBody();
        this.spikes.create(this.makeScale(1500), window.innerHeight - this.makeScale(50), 'spikes').setScale(this.makeScale(1)).refreshBody();
        this.spikes.create(this.makeScale(1550), window.innerHeight - this.makeScale(50), 'spikes').setScale(this.makeScale(1)).refreshBody();
        this.spikes.create(this.makeScale(1800), window.innerHeight - this.makeScale(140), 'spikes').setScale(this.makeScale(1)).refreshBody();
        this.spikes.create(this.makeScale(1900), window.innerHeight - this.makeScale(140), 'spikes').setScale(this.makeScale(1)).refreshBody();

        this.physics.add.overlap(this.player, this.spikes, () => {
            this.scene.start('Hurt', { 
                lvl: 'lvl11',
                usedSpark: this.playerUsedSpark,
                rest: this.playerMadeRest
                });
        }, null, this);
    }

    update() {
        this.createMovement(this.player, this.cursors)
    }
}