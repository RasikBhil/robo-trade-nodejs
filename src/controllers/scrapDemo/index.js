import express from "express";
const app = express.Router();


app.get('/public/gujCovid', (req,res,next) => {
    fetch('https://gujcovid19.gujarat.gov.in/')
        .then(resp => resp.text())
        .then((response) => {
                    const $= cheerio.load(response);
                    let rates = [];
                    let holder = [];
                    $("table.table-striped.table-bordered.table-hover.table-sm.text-center.mb-0 tbody>tr").each((i, data) => {
                        // console.log('DATA', $(data).text())
                        const item = $(data).text().replace(/\s+/g, ' ').trim();
                        let str = item.split(" ");
                        holder.push({
                            district: str[0],
                            activeCases: str[1],
                            testedIncreament: str[2],
                            caseTested:str[3],
                            currentRecovered:str[5],
                            patientRecovered:str[4],
                            underQuarantine:str[6],
                            totalDeath:str[7]
                        })
                    })

            let uniq = {};
            rates = holder.filter(obj => !uniq[obj.district] && (uniq[obj.district] = true))
            res.status(200).send({
                data:rates
            })
        })
        .catch(e => {
            console.log('error',e);
        })
})

app.get('/public/mutual-funds', (req,res,next) => {

    fetch('https://www.moneycontrol.com/mutual-funds/best-funds/equity.html')
        .then(resp => resp.text())
        .then(response => {
            const $= cheerio.load(response);
            let header = []
            let holder = [];
            $("table>thead").each((i,data) => {
                console.log('DATA', $(data).text().replace(/\s+/g, ' ').trim())
                let str = $(data).text().replace(/\s+/g, ' ').trim()
                if(str && str.length) {
                    // str.split(' ').map((item) => {
                        header.push({
                            title: str
                        })
                    // })
                }
            })

            res.send({
                statusCode:200,
                message:'working',
                data:header
            })
        })
})
