export interface IUser{
    id?: string
    name: string
    login: string
    password?: string
    email: string
    phone: string
    cpf: string
    birthDate: Date
    nameMother: string
    disabled: boolean
    inclusionDate?: Date
    changeDate?: Date
}