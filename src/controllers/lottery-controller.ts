import { Request, Response } from 'express';
import { LotteryService } from "../services/lottery-service.js";
import {
    activeQueryValidator,
    idParamValidator,
    ownerAddressValidator
} from "../validators/lottery-validator.js";

export class LotteryController {
    private lotteryService: LotteryService;

    constructor() {
        this.lotteryService = new LotteryService();
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const lotteries = await this.lotteryService.findAll();
            res.status(200).json(lotteries);
        } catch (error) {
            console.error("Error fetching lotteries:", error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Error fetching lotteries', error: error.message });
            }
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const { blockchainId } = await idParamValidator.validate(req.params);
            const result = await this.lotteryService.findById(blockchainId);

            if (!result) {
                res.status(404).json({ message: 'Lottery not found' });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            console.error("Error fetching lottery by ID:", error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Error fetching lottery', error: error.message });
            }
        }
    }

    public async getByDescription(req: Request, res: Response): Promise<void> {
        try {
            const { active, description } = await activeQueryValidator.validate(req.query);

            const lotteries = await this.lotteryService.findActiveByDescription(description, active);
            res.status(200).json(lotteries);
        } catch (error) {
            console.error("Error fetching active lotteries by description:", error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Error fetching active lotteries by description', error: error.message });
            } else {
                res.status(500).json({ message: 'Error fetching active lotteries by description', error: String(error) });
            }
        }
    }

    public async getByUser(req: Request, res: Response): Promise<void> {
        try {
            const { metamaskId } = req.params;
            const lotteries = await this.lotteryService.findByUser(metamaskId);
            res.status(200).json(lotteries);
        } catch (error) {
            console.error("Error fetching user lotteries:", error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Error fetching user lotteries', error: error.message });
            }
        }
    }

    public async getByOwner(req: Request, res: Response): Promise<void> {
        try {
            const {owner} = await ownerAddressValidator.validate(req.query);
            const lotteries = await this.lotteryService.findByOwnerAddress(owner);
            res.status(200).json(lotteries);
        } catch (error) {
            console.error("Error fetching owner lotteries:", error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Error fetching owner lotteries', error: error.message });
            }
        }
    }
}
