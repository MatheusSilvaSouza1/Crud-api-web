import * as dotenv from "dotenv";
import {resolve} from 'path'


const path = resolve(__dirname, '..', '..', '.env')
dotenv.config({path})

export const APP_SECRET = process.env.APP_SECRET