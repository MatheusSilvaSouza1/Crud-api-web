import path from "path";
import * as xlsx from 'xlsx';
import { IGenereteReport } from "../interfaces/IGenereteReport";
import { User } from "../models/User";

class Xlsx implements IGenereteReport {

    genereteFileReport(data: User[]): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                const workbook = xlsx.utils.book_new()
                const workSheetColumnNames: string[] = [
                    "name",
                    "login",
                    "email",
                    "phone",
                    "cpf",
                    "birthDate",
                    "nameMother"
                ]
                const workSheetName = 'ReportSheet' + Date.now()
                const filePath = `temp_data/${'ReportSheet' + Date.now()}.xlsx`

                const users = data.map(user => {
                    return [
                        user.name, user.login, user.email,
                        user.phone, user.cpf, user.birthDate,
                        user.nameMother
                    ]
                })

                const workSheetData = [
                    workSheetColumnNames,
                    ...users
                ]
                const workSheet = xlsx.utils.aoa_to_sheet(workSheetData)
                xlsx.utils.book_append_sheet(workbook, workSheet, workSheetName)
                xlsx.writeFile(workbook, path.resolve(filePath))
                resolve(filePath)
            } catch (error) {
                reject(error as string)
            }
        })
    }

}

export default Xlsx