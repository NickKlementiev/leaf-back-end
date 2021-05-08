import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Graphic } from '../models/Graphic';
import { GraphicsData } from '../models/GraphicsData';

class GraphicsController {
    async show(request: Request, response: Response) {
        const all: Object[] = [];

        const graphicsRepository = getRepository(Graphic);
        const graphicsDataRepository = getRepository(GraphicsData);

        const allGraphics = await graphicsRepository.find();

        for (let graphic of allGraphics) {
            const allData = await graphicsDataRepository.find({
                graphicId: graphic.id,
            });
            const current = {
                graphic,
                data: [...allData],
            };
            all.push(current);
        }

        return response.status(200).json(all);
    }

    async insertExampleGraphics(request: Request, response: Response) {
        const graphics = [
            {
                id: 1,
                title: 'LineExample',
                description: 'Line Graphic Example',
                type: 'line',
            },
            {
                id: 2,
                title: 'BarExample',
                description: 'Bar Graphic Example',
                type: 'bar',
            },
        ];
        const allData = [
            {
                id: 1,
                name: 'Page A',
                uv: 4000,
                pv: 2400,
                amt: 2400,
                graphicId: 1,
            },
            {
                id: 2,
                name: 'Page B',
                uv: 3000,
                pv: 1398,
                amt: 2210,
                graphicId: 1,
            },
            {
                id: 3,
                name: 'Page C',
                uv: 2000,
                pv: 9800,
                amt: 2900,
                graphicId: 1,
            },
            {
                id: 4,
                name: 'Page D',
                uv: 2780,
                pv: 3908,
                amt: 2000,
                graphicId: 1,
            },
            {
                id: 5,
                name: 'Page E',
                uv: 1890,
                pv: 4800,
                amt: 2181,
                graphicId: 1,
            },
            {
                id: 6,
                name: 'Page F',
                uv: 2390,
                pv: 3800,
                amt: 2500,
                graphicId: 1,
            },
            {
                id: 7,
                name: 'Page G',
                uv: 3490,
                pv: 4300,
                amt: 2100,
                graphicId: 1,
            },
            {
                id: 8,
                name: 'Page A',
                uv: 4000,
                pv: 2400,
                amt: 2400,
                graphicId: 2,
            },
            {
                id: 9,
                name: 'Page B',
                uv: 3000,
                pv: 1398,
                amt: 2210,
                graphicId: 2,
            },
            {
                id: 10,
                name: 'Page C',
                uv: 2000,
                pv: 9800,
                amt: 2900,
                graphicId: 2,
            },
            {
                id: 11,
                name: 'Page D',
                uv: 2780,
                pv: 3908,
                amt: 2000,
                graphicId: 2,
            },
            {
                id: 12,
                name: 'Page E',
                uv: 1890,
                pv: 4800,
                amt: 2181,
                graphicId: 2,
            },
            {
                id: 13,
                name: 'Page F',
                uv: 2390,
                pv: 3800,
                amt: 2500,
                graphicId: 2,
            },
            {
                id: 14,
                name: 'Page G',
                uv: 3490,
                pv: 4300,
                amt: 2100,
                graphicId: 2,
            },
        ];

        const graphicsRepository = getRepository(Graphic);
        const graphicsDataRepository = getRepository(GraphicsData);

        for (let graphic of graphics) {
            const current = graphicsRepository.create(graphic);
            await graphicsRepository.save(current);
        }

        for (let data of allData) {
            const current = graphicsDataRepository.create(data);
            await graphicsDataRepository.save(current);
        }

        return response.status(200).json({
            message: 'Examples generated succesfully!',
        });
    }
}

export { GraphicsController };
