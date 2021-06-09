import { User } from "../models/User";

export interface IGenereteReport {

    genereteFileReport(data: User[]): Promise<string>
}