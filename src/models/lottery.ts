import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {v4 as uuidv4} from 'uuid';

@Entity({name: 'lottery'})
export class Lottery {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'blockchain_id'})
    blockchainId: string;

    @Column()
    description: string;

    @Column({name: 'ticket_price'})
    ticketPrice: number;

    @Column({type: 'varchar'})
    owner: string;

    @Column({name:'winner_address',nullable: true, type: 'varchar'})
    winnerAddress: string;

    @Column({nullable: true, name:'end_date'})
    endDate: Date;

    constructor(blockchainId: string, owner: string, description: string, ticketPrice: number, endDate: Date = null, winnerAddress: string = '') {
        this.id = uuidv4();
        this.blockchainId = blockchainId;
        this.owner = owner;
        this.description = description;
        this.ticketPrice = ticketPrice;
        this.endDate = endDate;
        this.winnerAddress = winnerAddress;
    }
}