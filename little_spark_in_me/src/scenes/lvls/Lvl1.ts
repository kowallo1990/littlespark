import { LvlPrototype } from '../LvlPrototype'

export class Lvl1 extends LvlPrototype
{
    playerCanMove: boolean = true   
    constructor ()
    {
        super('lvl1');
    }

    create ()
    {
        this.constructTheSceene(this.playerCanMove)
    }
}