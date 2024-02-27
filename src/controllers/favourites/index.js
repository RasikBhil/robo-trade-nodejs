import express from "express";
const router = express.Router();
import db from '../../datasource/index.js'
import { addToFavourite, deleteFromFavourite } from "./services.js";
const favourites = db.favouritesModel;

router.get('/get-favourites', async (req, res) => {

    let client_ID = req.query.client_ID;

    await favourites.findOne({client_ID: client_ID }).then((resp) => {
        console.log("got data from db", resp);

        res.status(200).json({ 'success': true, 'result': resp })
    })
});

router.post("/add-favourites", (req, res) => {

    let client_ID = req.query.client_ID;
    let token = req.query.token
    addToFavourite(client_ID, token, res);
})

router.post("/delete-favourites", (req, res) => {

    let client_ID = req.query.client_ID;
    let token = req.query.token
    deleteFromFavourite(client_ID, token, res);
})



export default router;