import express from "express";
import fetch from "node-fetch";
import {addInstruments} from "./services.js";
const router = express.Router();
import db from '../../datasource/index.js'
const instruments = db.instrumentModel;



router.get('/add-instruments', (req, res) => {
    fetch('https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json')
        .then((res) => res.json())
        .then( async response => {
            try {
                await addInstruments(response)
                res.send({message:'success'});
            } catch (error) {
                res.send(error);
            }
        })
})

router.get('/search', async (req, res) => {
    const regex = new RegExp(req.query.name.toUpperCase());
    const instrumentModel = await instruments.find(
        {$or:[
            {name:{'$in':[regex]}},{symbol:{'$in':[regex]}}
            ]
        })
    try {
        res.send(instrumentModel)
    }catch (e) {
        res.status(304).send('error')
    }
})

export default router;
