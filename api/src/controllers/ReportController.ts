import { Request, Response } from "express";
import { unlinkSync } from "fs";
import { getRepository } from "typeorm";
import { User } from "../models/User";
import GenereteReportService from "../services/genereteReportService";
import Pdf from "../util/generetePdf";
import Xlsx from "../util/genereteXlsx";

export default {

    async report(req: Request, res: Response) {
        const { inclusionFirst, inclusionEnd, changedFirst, changedEnd, minAge, maxAge, type = 'xlsx' } = req.query

        try {
            const repository = getRepository(User)
            const data = await repository
                .createQueryBuilder("user")
                .where("(user.inclusionDate >= :inclusionFirst and user.inclusionDate <= :inclusionEnd)", { inclusionFirst, inclusionEnd })
                .andWhere("(user.changeDate >= :changedFirst and user.changeDate <= :changedEnd)", { changedFirst, changedEnd })
                .andWhere(
                    "((strftime('%Y',date()) - strftime('%Y', user.birthDate)) > :minAge) and ((strftime('%Y',date()) - strftime('%Y', user.birthDate)) < :maxAge)",
                    { minAge: parseInt(minAge as string), maxAge: parseInt(maxAge as string) }
                )
                .orderBy("user.name", "ASC")
                .getMany()
                    
            var geneteReportServ
            var pathFile = ''

            switch (type) {
                case 'xlsx':
                    geneteReportServ = new GenereteReportService(new Xlsx())
                    pathFile = await geneteReportServ.generete(data)
                    res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                    return res.status(200).download(pathFile, () => {
                        unlinkSync(pathFile)
                    })
                case 'pdf':
                    geneteReportServ = new GenereteReportService(new Pdf())
                    pathFile = await geneteReportServ.generete(data)
                    res.contentType('application/pdf')
                    return res.status(200).download(pathFile, () => {
                        unlinkSync(pathFile)
                    })
                default:
                    throw new Error("Tipo de arquivo nao suportado");
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message })
        }
    },
}