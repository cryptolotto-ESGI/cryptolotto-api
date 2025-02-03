import { Request, Response } from 'express';
import { LotteryService } from "../services/lottery-service.js";
import {  idParamValidator } from "../validators/lottery-validator.js";

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
            const { id } = await idParamValidator.validate(req.params);
            const result = await this.lotteryService.findById(id);

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

    public async getActive(req: Request, res: Response): Promise<void> {
        try {
            const { active } = req.query;
            const isActive = active === 'true';
            const lotteries = await this.lotteryService.findActive(isActive);
            res.status(200).json(lotteries);
        } catch (error) {
            console.error("Error fetching active lotteries:", error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Error fetching active lotteries', error: error.message });
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
}
