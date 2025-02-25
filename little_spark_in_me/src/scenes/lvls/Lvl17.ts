import { LvlPrototype } from '../LvlPrototype'

export class Lvl17 extends LvlPrototype
{
    text: any; 
    playerCanMove: boolean = true;
    platforms: any;
    player: any;
    kid: any;
    cursors: any;

    constructor ()
    {
        super('lvl17', true);
    }

    create ()
    {
        this.text = this.add.text(100, 100, 'Level 17', { fontSize: '32px', color: '#fff' });
        this.text.depth = 101
        
        this.constructTheSceene()

        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(window.innerWidth/2, window.innerHeight, 'ground_long').setScale(window.innerWidth/1920).refreshBody();

        this.player = this.physics.add.sprite(100, window.innerHeight - 100, 'player').setScale(window.innerWidth/1920);
        this.makePlayer(this.player)

        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard.createCursorKeys()

        this.kid  = this.physics.add.sprite(window.innerWidth - 100, window.innerHeight - 100, 'kid').setScale(window.innerWidth/1920);
        this.makePlayer(this.kid);
        this.physics.add.collider(this.kid, this.platforms);

        this.physics.add.overlap(this.player, this.kid, () => {
            
        }, null, this);
    }

    update() {
        this.createMovement(this.player, this.cursors, this.playerCanMove)
    }
}