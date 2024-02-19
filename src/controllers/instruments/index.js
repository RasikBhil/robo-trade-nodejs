import express from "express";
import { fetchInstrumentData } from "./services.js";
const router = express.Router();
import db from '../../datasource/index.js'
const instruments = db.instrumentModel;



router.get('/add-instruments', (req, res) => {
    fetchInstrumentData()
})

router.get('/search', async (req, res) => {
    const regex = new RegExp(req.query.name.toUpperCase());
    const page = req.query.page;
    const skip = 10 * (page - 1);

    const instrumentModel = await instruments.find(
        {
            $or: [
                { name: { '$in': [regex] } }, { symbol: { '$in': [regex] } }, { exch_seg: { '$in': [regex] } }
            ]
        }).limit(10).skip(skip)
    try {
        res.send(instrumentModel)
    } catch (e) {
        res.status(304).send('error')
    }
})

export default router;
