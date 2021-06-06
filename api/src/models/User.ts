import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

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

}