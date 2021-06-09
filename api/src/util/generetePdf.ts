import { IGenereteReport } from "../interfaces/IGenereteReport";
import { User } from "../models/User";
import { resolve as pathResolve } from 'path'
import ejs from 'ejs'
import pdf from 'html-pdf'

class Pdf implements IGenereteReport {

    genereteFileReport(data: User[]): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                const path = pathResolve(__dirname, '..', 'template', 'reportPdf.ejs');
                ejs.renderFile(path, { users: data }, (err, html) => {
                    if (err) {
                        reject(err)
                    }

                    const options = {
                        height: "11.25in",
                        width: "8.5in",
                        header: {
                            height: "10mm"
                        },
                        footer: {
                            height: "10mm"
                        },
                    }
                    
                    pdf.create(html, options).toFile("temp_data/report.pdf", (err) => {
                        if (err) {
                            reject("Erro ao gerar o PDF")
                        }
                        resolve("temp_data/report.pdf")
                    })
                })
            } catch (error) {
                reject(error as string)
            }
        })
    }


}

export default Pdf