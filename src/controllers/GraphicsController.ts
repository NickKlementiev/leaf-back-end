import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {Graphic} from "../models/Graphic";
import {GraphicsData} from "../models/GraphicsData";

class GraphicsController {
    async show(request: Request, response: Response) {
        const all: Object[] = [];

        const graphicsRepository = getRepository(Graphic);
        const graphicsDataRepository = getRepository(GraphicsData);

        const allGraphics = await graphicsRepository.find();

        for (let graphic of allGraphics) {
            const allData = await graphicsDataRepository.find({ graphicId: graphic.id });
            const current = {
                graphic,
                data: [...allData]
            };
            all.push(current);
        }

        return response.status(200).json(all);
    }
}

export { GraphicsController };
