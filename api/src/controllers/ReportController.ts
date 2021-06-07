import { Request, Response } from "express";
import { getRepository, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { User } from "../models/User";

export default {

    async report(req: Request, res: Response) {
        const repository = getRepository(User)
        const { inclusionFirst, inclusionEnd, changedFirst, changedEnd, minAge, maxAge } = req.query

        const [data, count] = await repository
            .createQueryBuilder("user")
            .where("(user.inclusionDate >= :inclusionFirst and user.inclusionDate <= :inclusionEnd)", { inclusionFirst, inclusionEnd })
            .andWhere("(user.changeDate >= :changedFirst and user.changeDate <= :changedEnd)", { changedFirst, changedEnd })
            .andWhere(
                "((strftime('%Y',date()) - strftime('%Y', user.birthDate)) > :minAge) and ((strftime('%Y',date()) - strftime('%Y', user.birthDate)) < :maxAge)",
                { minAge: parseInt(minAge as string), maxAge: parseInt(maxAge as string) }
            )
            .orderBy("user.name", "ASC")
            .getManyAndCount()
        res.header('X-Total-Count', count + '')
        return res.status(200).json(data)
    }
}