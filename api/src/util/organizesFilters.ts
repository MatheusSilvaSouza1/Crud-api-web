import { Like } from "typeorm";
import { IFilterFields } from "../interfaces/IFilterFiels";

export function organizesFilters(filterFields: IFilterFields) {
    const fields = []

    if (filterFields?.name !== '') {
        fields.push({ name: Like(`%${filterFields?.name}%`) })
    }
    if (filterFields?.cpf !== '') {
        fields.push({ cpf: Like(`%${filterFields?.cpf}%`) })
    }
    if (filterFields?.login !== '') {
        fields.push({ login: Like(`%${filterFields?.login}%`) })
    }

    if (filterFields ?.disabled !== false) {
        fields.push({ disabled: filterFields?.disabled })
    }

    return fields
}
