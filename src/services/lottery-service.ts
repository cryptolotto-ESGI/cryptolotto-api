import { Repository } from "typeorm";
import {Ticket} from "../models/ticket.js";
import {Lottery} from "../models/lottery.js";
import {db} from "../config/data-source.js";

export class LotteryService {
    private lotteryRepository: Repository<Lottery>;
    ticketRepository: Repository<Ticket>

    constructor() {
        this.lotteryRepository = db.getRepository(Lottery);
        this.ticketRepository = db.getRepository(Ticket);
    }

    public async findAll(): Promise<Lottery[]> {
        try {
            return await this.lotteryRepository.find();
        } catch (error) {
            throw new Error('Error fetching all lotteries');
        }
    }

    async findById(id: string): Promise<{ lottery: Lottery, totalTickets: number } | null> {
        try {
            const lottery = await db.getRepository(Lottery).findOne({
                where: { id: id }
            });

            if (!lottery) {
                throw new Error('Lottery not found');
            }

            const tickets = await db.getRepository(Ticket).findBy({ lottery: { id: lottery.id } });
            return {lottery, totalTickets: tickets.length};
        } catch (error) {
            throw new Error('Error fetching lottery by ID');
        }
    }

    public async findByUser(metamaskId: string): Promise<Lottery[]> {
        try {
            return await this.lotteryRepository.findBy({
                winnerAddress: metamaskId
            });
        } catch (error) {
            throw new Error('Error fetching lotteries by user');
        }
    }

    public async findActive(active: boolean): Promise<Lottery[]> {
        try {
            const lotteries = await this.lotteryRepository.find();
            const now = new Date();

            return lotteries.filter(lottery => {
                const lotteryEndDate = new Date(lottery.endDate);

                if (active) {
                    return lotteryEndDate > now && (lottery.winnerAddress === null || lottery.winnerAddress === '');
                }
                return lotteryEndDate <= now || (lottery.winnerAddress !== null && lottery.winnerAddress !== '');
            });

        } catch (error) {
            throw new Error('Error fetching active lotteries');
        }
    }
}