import { Column, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from 'uuid';

@Entity()
export class User {

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    login: string

    @Column()
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

    @Column()
    inclusionDate: Date

    @Column()
    changeDate: Date

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}