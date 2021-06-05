import { BeforeInsert, BeforeUpdate, Column, Entity, getRepository, Like, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { APP_SECRET } from "../config/env";
import { IFilterFields } from "../interfaces/IFilterFiels";
import { organizesFilters } from "../util/organizesFilters";

@Entity()
export class User {

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column({
        type: "varchar",
        unique: true,
    })
    login: string

    @Column({
        select: false
    })
    password: string

    @Column()
    email: string

    @Column()
    phone: string

    @Column()
    cpf: string

    @Column()
    birthDate: Date

    @Column()
    nameMother: string

    @Column({ default: false })
    disabled: boolean

    @Column({ nullable: true })
    inclusionDate: Date

    @Column({ nullable: true })
    changeDate: Date

    @BeforeInsert()
    insertDates() {
        this.inclusionDate = new Date();
    }

    @BeforeUpdate()
    updateDates() {
        this.changeDate = new Date();
    }

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }

    async findAll(page: number, filterFields: IFilterFields) {
        try {
            const repository = getRepository(User)

            const [users, count] = await repository
                .findAndCount({
                    take: 10,
                    skip: 10 * (page - 1),
                    order: {
                        name: "ASC"
                    },
                    where: organizesFilters(filterFields).map((fielter: any) => fielter)
                })
            return { users, count }
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    async findOne(id: string){
        try {
            const repository = getRepository(User)
            const user = await repository.findOne({
                where: {
                    id
                }
            })
            if (!user) {
                throw new Error("User not found!");
            }
            
            return user
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    async insert(user: User) {
        try {
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
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    async delete(id: string) {
        try {
            const repository = getRepository(User)
            const exists = await repository.findOne({
                where: {
                    id
                }
            })
            if (!exists) {
                throw new Error("User do not exists!");
            }
            await repository.remove(exists)
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    async update(user: User) {
        try {
            const repository = getRepository(User)
            const exists = await repository.findOne({
                where: {
                    id: user.id
                }
            })
            if (!exists) {
                throw new Error("User do not exists!");
            }
            user.password = await bcrypt.hash(user.password, 8)
            await repository.save(user)
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    async logar(login: string, password: string) {
        try {
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

            if (exists) {
                if (await bcrypt.compare(password, exists.password)) {
                    const token = await jwt.sign({ id: exists.id }, APP_SECRET as string, {
                        expiresIn: '1d'
                    })
                    return { token }
                } else {
                    throw new Error("Invalid login or password!");
                }
            } else {
                throw new Error("Invalid login or password!");
            }
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    async recoverPassword(email: string, cpf: string, nameMother: string, newPassword: string) {
        try {
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
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }
}