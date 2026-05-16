import { Request, Response } from "express";
import OptionService from "../services/optionServices.js";
import { createOptionSchema } from "../schema/option.schema.js";

class OptionController {

    // Pega todas as opções de uma sala
    async getAll(req: Request, res: Response) {
        const roomId = req.params.roomId as string;
        const options = await OptionService.findAllOptions(roomId);

        res.status(200).json(options);
    }

    // Pega uma opção específica de uma sala
    async getById(req: Request, res: Response) {
        const id = req.params.id as string;
        const option = await OptionService.findOptionById(id);

        if (!option) throw new Error("Opção não encontrada");

        res.status(200).json(option);
    }

    // Cria uma nova opção para uma sala
    async create(req: Request, res: Response) {
        const data = createOptionSchema.parse(req.body);
        const newOption = await OptionService.createOption(data);

        res.status(200).json(newOption);
    }

    // Atualiza o texto de uma opção
    async update(req: Request, res: Response) {
        const { id, text }: { id: string; text: string } = req.body;
        const updatedOption = await OptionService.updateOption(id, text);

        res.status(200).json(updatedOption);
    }

    //Deleta opção de uma sala
    async delete(req: Request, res: Response) {
        const id: string = req.params.id as string;
        const deletedOption = await OptionService.deleteOption(id);

        res.status(200).json(deletedOption);
    }
}

export default new OptionController();