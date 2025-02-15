import jwt from 'jsonwebtoken';
import { Response } from 'express';
import {findById} from '../services/employeServices'

const getUserByToken = async (token: string | undefined, res: Response) => {
    const senha = process.env.SENHAJWT
    return new Promise(async (resolve, reject) => {
        if(!token){
            return res.status(401).json({err: "Acesso Negado!"})
        }
        
        const decode = jwt.decode(token, senha);
        const user_id = decode?.id;

        try {
            const user = await findById(user_id)
            const employe = {
                nome: user?.nome,
                id: user?.funcionario_id,
                funcao: user?.funcao,
                cpf: user?.cpf
            }
            if(!decode){
                reject({status: 404, message: "Usuario não encontrado"});
            }
            resolve(employe)
        } catch (error) {
            reject({status: 500, message: "erro ao buscar usuario"});
        }
    })
}

export default getUserByToken;