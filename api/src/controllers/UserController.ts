import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { IFilterFields } from "../interfaces/IFilterFiels";
import { User } from "../models/User";
import { organizesFilters } from "../util/organizesFilters";
import * as bcrypt from 'bcrypt'


export default {

    async findAll(req: Request, res: Response) {
        const { name = '', cpf = '', login = '', disabled = false, page = 1 } = req.query
        const filterFields: IFilterFields = {
            name: name.toString(),
            cpf: cpf.toString(),
            login: login.toString(),
            disabled: disabled === 'true'
        }
        try {
            const repository = getRepository(User)
            const [users, count] = await repository
                .findAndCount({
                    take: 10,
                    skip: 10 * (parseInt(page.toString()) - 1),
                    order: {
                        name: "ASC"
                    },
                    where: organizesFilters(filterFields).map((fielter: any) => fielter)
                })
            res.header('X-Total-Count', count + '')
            return res.status(200).json(users)
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: error.message })
        }
    },

    async findOne(req: Request, res: Response) {
        try {
            const { id } = req.params
            const repository = getRepository(User)
            const user = await repository.findOne({
                where: {
                    id
                }
            })
            if (!user) {
                throw new Error("User not found!");
            }
            return res.status(200).json(user)
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message })
        }
    },

    async insert(req: Request, res: Response) {
        try {
            const {
                name, login, password, email,
                phone, cpf, birthDate, nameMother
            } = req.body

            const user = new User()

            user.name = name.toString().toUpperCase()
            user.login = login
            user.password = password
            user.email = email
            user.phone = phone
            user.cpf = cpf
            user.birthDate = birthDate
            user.nameMother = nameMother

            const repository = getRepository(User)
            const exists = await repository.findOne({
                where: {
                    cpf: user.cpf
                }
            })
            if (exists) {
                throw new Error("User already exists!");
            }
            user.password = await bcrypt.hash(user.password, 8)
            await repository.save(user)
            return res.sendStatus(201)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const { ids } = req.body

            const repository = getRepository(User)
            ids.map(async (id: string) => {
                const exists = await repository.findOne({
                    where: {
                        id
                    }
                })
                if (!exists) {
                    throw new Error("User do not exists!");
                }
                exists.disabled = true
                await repository.save(exists)
            })
            return res.sendStatus(200)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const {
                name, login, password, email, phone,
                cpf, birthDate, nameMother, disabled
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
            user.disabled = disabled

            const repository = getRepository(User)
            const exists = await repository.findOne({
                where: {
                    id: user.id
                },
                select: [
                    "id", "name", "login",
                    "password", "email", "phone",
                    "cpf", "birthDate", "nameMother", "disabled"
                ]
            })

            if (!exists) {
                throw new Error("User do not exists!");
            }

            if (user.password !== '' && !await bcrypt.compare(user.password, exists.password)) {
                user.password = await bcrypt.hash(user.password, 8)
            } else {
                user.password = exists.password
            }

            await repository.save(user)
            return res.sendStatus(200)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

}