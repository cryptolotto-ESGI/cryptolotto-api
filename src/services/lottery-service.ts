import {Repository} from "typeorm";
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
            const lottery = await this.lotteryRepository.findOne({
                where: { blockchainId: id }
            });

            if (!lottery) {
                return null;
            }

            const tickets = await this.ticketRepository.findBy({ lottery: { id: lottery.id } });
            return {lottery, totalTickets: tickets.length};
        } catch (error) {
            throw new Error('Error fetching lottery by ID');
        }
    }

    async findByOwnerAddress(owner: string):Promise<Lottery[]> {
        try {
            return await this.lotteryRepository.findBy({owner: owner})
        } catch (error) {
            throw new Error('Error fetching lotteries by owner address');
        }
    }

    public async findByUser(metamaskId: string): Promise<Lottery[]> {
        try {
            return await this.lotteryRepository
                .createQueryBuilder("lottery")
                .innerJoin("ticket", "ticket", "ticket.lottery_id = lottery.id")
                .where("ticket.buyer = :buyer", {buyer: metamaskId})
                .getMany();
        } catch (error) {
            throw new Error('Error fetching lotteries by user');
        }
    }


    public async findActiveByDescription(description?: string, active?: boolean): Promise<Lottery[]> {
        try {
            let query = this.lotteryRepository.createQueryBuilder('lottery');

            if (description) {
                query = query.where("lottery.description ILIKE :description", { description: `%${description}%` });
            }
            const lotteries = await query.getMany();
            if (active === undefined || active === null) {
                return lotteries;
            }
            const now = new Date();
            return lotteries.filter(lottery => {
                const lotteryEndDate = new Date(lottery.endDate);
                if (active) {
                    return lotteryEndDate > now && (!lottery.winnerAddress || lottery.winnerAddress.trim() === '');
                } else {
                    return lotteryEndDate <= now || (lottery.winnerAddress && lottery.winnerAddress.trim() !== '');
                }
            });
        } catch (error) {
            throw new Error('Error fetching lotteries by description');
        }
    }
}