import {Request, Response} from 'express';
import knex from '../database/connection';


class UserController {    
    read(request: Request, response: Response){
        const users = response.json;

        return users;
    }

    readById(request: Request, response: Response){        
        const {id} = request.params;
        
        const user = knex('users').select('*').where('id',id);

        if(!user){
            return response.status(400).json({message: 'Not found'});
        }

        return response.json(user);
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

export default UserController;