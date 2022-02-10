import express, {json, response} from 'express';
const app = express();
// const mongoose = require("mongoose");
import mongoose from 'mongoose';
import fetch from "node-fetch";
import InstrumentModal from './src/models/instrument.js'

import cheerio from "cheerio";
const username = "admin";
const password = encodeURIComponent('mit@123');
const cluster = "Robo Trade";
const dbname = "RoboTrade";

app.use(express.urlencoded({extended:false}))
app.use(express.json())

mongoose.connect(
    `mongodb+srv://admin:${password}@robotrade.5inrp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

// app.use(express.static('public'))




// app.get('/public/gujCovid', (req,res,next) => {
//     fetch('https://gujcovid19.gujarat.gov.in/')
//         .then(resp => resp.text())
//         .then((response) => {
//                     const $= cheerio.load(response);
//                     let rates = [];
//                     let holder = [];
//                     $("table.table-striped.table-bordered.table-hover.table-sm.text-center.mb-0 tbody>tr").each((i, data) => {
//                         // console.log('DATA', $(data).text())
//                         const item = $(data).text().replace(/\s+/g, ' ').trim();
//                         let str = item.split(" ");
//                         holder.push({
//                             district: str[0],
//                             activeCases: str[1],
//                             testedIncreament: str[2],
//                             caseTested:str[3],
//                             currentRecovered:str[5],
//                             patientRecovered:str[4],
//                             underQuarantine:str[6],
//                             totalDeath:str[7]
//                         })
//                     })
//
//             let uniq = {};
//             rates = holder.filter(obj => !uniq[obj.district] && (uniq[obj.district] = true))
//             res.status(200).send({
//                 data:rates
//             })
//         })
//         .catch(e => {
//             console.log('error',e);
//         })
// })
//
// app.get('/public/mutual-funds', (req,res,next) => {
//
//     fetch('https://www.moneycontrol.com/mutual-funds/best-funds/equity.html')
//         .then(resp => resp.text())
//         .then(response => {
//             const $= cheerio.load(response);
//             let header = []
//             let holder = [];
//             $("table>thead").each((i,data) => {
//                 console.log('DATA', $(data).text().replace(/\s+/g, ' ').trim())
//                 let str = $(data).text().replace(/\s+/g, ' ').trim()
//                 if(str && str.length) {
//                     // str.split(' ').map((item) => {
//                         header.push({
//                             title: str
//                         })
//                     // })
//                 }
//             })
//
//             res.send({
//                 statusCode:200,
//                 message:'working',
//                 data:header
//             })
//         })
// })

app.get('/',(req, res) => {
    res.send({status:200, message:'working'})
})

app.get('/add-instruments', (req,res) => {
    fetch('https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json')
        .then((res) => res.json())
        .then( async response => {
            // const user = new userModel(request.body);
            // const instruments = new InstrumentModal(response[0])
            try {
                await addInstruments(response)
                res.send({message:'success'});
            } catch (error) {
                res.send(error);
            }
        })
})

function addInstruments(instruments) {
    return new Promise.all(instruments.map((instrument) => {
        return new Promise(async (resolve, reject) => {
            const instruments = new InstrumentModal(instrument)
            try {
                await instruments.save();
                resolve({message:'instruments added'})
            } catch (error) {
                reject(error);
            }
        })
    }))
}


const server = app.listen(process.env.PORT || 3030, () => {
    console.log('Server listning on port', 3030)
})
