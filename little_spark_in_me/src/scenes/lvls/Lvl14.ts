import { LvlPrototype } from '../LvlPrototype'

export class Lvl14 extends LvlPrototype
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
        super('lvl14', true);
    }

    create ()
    {
        this.text = this.add.text(this.makeScale(100), this.makeScale(100), 'Level 14', { fontSize: '32px', color: '#fff' });
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
            this.scene.start('lvl15', {
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
                lvl: 'lvl14',
                usedSpark: this.playerUsedSpark,
                rest: this.playerMadeRest,
                wasOnWeak: this.playerWasOnWeak
                });
        }, null, this);
    }

    update() {
        this.createMovement(this.player, this.cursors, this.playerCanMove)
    }
}