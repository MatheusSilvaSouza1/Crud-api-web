import { Like } from "typeorm";
import { IFilterFields } from "../interfaces/IFilterFiels";

export function organizesFilters(filterFields: IFilterFields) {
    const fields = []

    if (filterFields.name !== '') {
        fields.push({ name: Like(`%${filterFields.name}%`), disabled: filterFields.disabled })
    }
    if (filterFields.cpf !== '') {
        fields.push({ cpf: Like(`${filterFields.cpf}%`), disabled: filterFields.disabled })
    }
    if (filterFields.login !== '') {
        fields.push({ login: Like(`%${filterFields.login}%`), disabled: filterFields.disabled })
    }
    if (fields.length === 0) {
        fields.push({ disabled: filterFields.disabled })
    }

    return fields
}
