import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { APP_SECRET } from "../config/env";

export default {
    async login(req: Request, res: Response) {
        try {
            const { login = '', password = '' } = req.body

            const repository = getRepository(User)
            const exists = await repository.findOne({
                select: ["id", "login", "password", "disabled"],
                where: {
                    login,
                }
            })

            if (!exists) {
                throw new Error("User do not exists!");
            }

            if (exists.disabled === true) {
                throw new Error("The user is disabled!");
            }

            if (await bcrypt.compare(password, exists.password)) {
                const token = await jwt.sign({ id: exists.id }, APP_SECRET as string, {
                    expiresIn: '1d'
                })
                return res.status(200).json({ token })
            } else {
                throw new Error("Invalid login or password!");
            }
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    async recoverPassword(req: Request, res: Response) {
        try {
            const { email, cpf, nameMother, newPassword } = req.body

            const repository = getRepository(User)
            const exists = await repository.findOne({
                where: {
                    email,
                    cpf,
                    nameMother
                }
            })

            if (!exists) {
                throw new Error("User do not exists or data is not incorrect!");
            }

            if (exists.disabled === true) {
                throw new Error("The user is disabled!");
            }

            exists.password = await bcrypt.hash(newPassword, 8)
            await repository.save(exists)
            return res.sendStatus(200)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}