import {Request, Response, json} from 'express';
import knex from '../database/connection';

class ItemController {

    async index(request: Request, response: Response){
        const items = await knex('items',).select('*');
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`,
            };
        });      
        return response.json(serializedItems);
    }

    async update(request: Request, response: Response){
        return'';
    }

    async create(request: Request, response: Response){
        return'';
    }

    async delete(request: Request, response: Response){
        return'';
    }
};

export default ItemController;