import { BeforeInsert, BeforeUpdate, Column, Entity, getRepository, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity()
export class User {

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
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

    async findAll() {
        try {
            const repository = getRepository(User)
            const users = await repository.find()
            return users
        } catch (error) {
            console.log(error.message);
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
                throw new Error("User already exists");
            }
            await repository.save(user)
        } catch (error) {
            console.log(error.message);
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
                throw new Error("The user do not exists");
            }
            await repository.remove(exists)
        } catch (error) {
            console.log(error.message);
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
                throw new Error("The user do not exists");
            }
            await repository.save(user)
        } catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }
}