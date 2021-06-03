import * as dotenv from "dotenv";
import {resolve} from 'path'


const path = resolve(__dirname, '..', '..', '.env')
dotenv.config({path})

console.log(process.env.APP_SECRET);
export const APP_SECRET = process.env.APP_SECRET