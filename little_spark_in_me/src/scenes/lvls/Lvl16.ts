import { LvlPrototype } from '../LvlPrototype'

export class Lvl16 extends LvlPrototype
{
    text: any; 
    playerCanMove: boolean = true;
    platforms: any;
    player: any;
    kid: any;
    cursors: any;
    spikes: any;
    smallPlatforms: any;

    constructor ()
    {
        super('lvl16', true);
    }

    create ()
    {
        this.text = this.add.text(this.makeScale(100), this.makeScale(100), 'Level 16', { fontSize: '32px', color: '#fff' });
        this.text.depth = 101
        
        this.constructTheSceene(this.playerMadeRest ? 700 : 1200)

        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(window.innerWidth/2, window.innerHeight, 'ground_long').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(400), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(450), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(750), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(800), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(1150), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(1200), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(1550), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();
        this.platforms.create(this.makeScale(1600), window.innerHeight - this.makeScale(140), 'obsticle').setScale(this.makeScale(1)).refreshBody();

        this.player = this.physics.add.sprite(this.makeScale(100), window.innerHeight - this.makeScale(100), 'player').setScale(this.makeScale(1));
        this.makePlayer(this.player)

        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard.createCursorKeys()

        this.kid  = this.physics.add.sprite(window.innerWidth - this.makeScale(100), window.innerHeight - this.makeScale(100), 'kid').setScale(this.makeScale(1));
        this.makePlayer(this.kid);
        this.physics.add.collider(this.kid, this.platforms);

        this.physics.add.overlap(this.player, this.kid, () => {
            this.scene.start('lvl17', {
                usedSpark: this.playerUsedSpark,
                rest: this.playerMadeRest,
                wasOnWeak: this.playerWasOnWeak
            });
        }, null, this);

        //spikes

        this.spikes = this.physics.add.group({
            key: 'spikes',
            repeat: 18,
            setXY: { x: this.makeScale(300), y:  window.innerHeight - this.makeScale(50), stepX: 100 }
        });

        this.physics.add.overlap(this.player, this.spikes, () => {
            this.scene.start('Hurt', { 
                lvl: 'lvl16',
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