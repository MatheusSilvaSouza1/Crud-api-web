import { IGenereteReport } from "../interfaces/IGenereteReport";
import { User } from "../models/User";

class GenereteReportService {

    _genereteFile: IGenereteReport

    constructor(genereteFile: IGenereteReport){
        this._genereteFile = genereteFile
    }

    generete(data: User[]) {
        return this._genereteFile.genereteFileReport(data)
    }
}

export default GenereteReportService