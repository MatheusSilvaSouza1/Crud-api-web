import { Request, Response } from "express";
import { User } from "../models/User";
import * as bcrypt from 'bcrypt'

export default {
    async findAll(req: Request, res: Response) {
        try {
            const {page} = req.params
            const { users, count} = await new User().findAll(parseInt(page))
            res.header('X-Total-Count', count + '')
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    async insert(req: Request, res: Response) {
        try {
            const {
                name,
                login,
                password,
                email,
                phone,
                cpf,
                birthDate,
                nameMother
            } = req.body

            const user = new User()

            user.name = name
            user.login = login
            user.password = password
            user.email = email
            user.phone = phone
            user.cpf = cpf
            user.birthDate = birthDate
            user.nameMother = nameMother
            await user.insert(user)
            return res.sendStatus(201)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            await new User().delete(id)
            return res.sendStatus(200)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const {
                name,
                login,
                password,
                email,
                phone,
                cpf,
                birthDate,
                nameMother
            } = req.body

            const user = new User()
            user.id = id
            user.name = name
            user.login = login
            user.password = password
            user.email = email
            user.phone = phone
            user.cpf = cpf
            user.birthDate = birthDate
            user.nameMother = nameMother
            await user.update(user)
            return res.sendStatus(200)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    
    async login(req: Request, res: Response){
        try {
            const {email, password} = req.body
            const token = await new User().logar(email, password)
            
            return res.status(200).json(token)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    async recoverPassword(req: Request, res: Response) {
        try {
            const { email, cpf, nameMother, newPassword } = req.body
            await new User().recoverPassword(email, cpf, nameMother, newPassword)
            return res.sendStatus(200)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}