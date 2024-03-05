import express from "express";
const router = express.Router();
import db from "../../datasource/index.js";
import {
  addToFavourite,
  deleteFromFavourite,
  errorRes,
  successRes,
} from "./services.js";
const favourites = db.favouritesModel;

router.get("/get-favourites", async (req, res) => {
  let client_ID = req.query.client_ID;

  await favourites.findOne({ client_ID: client_ID }).then((resp) => {
    if (resp) {
      res.status(200).json(successRes(resp));
    } else {
      res.status(200).json(errorRes("FAV001", "No Data Found!"));
    }
  });
});

router.post("/add-favourites", (req, res) => {
  let client_ID = req.body.params.client_ID;
  let token = req.body.params.token;
  addToFavourite(client_ID, token, res);
});

router.post("/delete-favourites", (req, res) => {
  let client_ID = req.body.params.client_ID;
  let token = req.body.params.token;
  deleteFromFavourite(client_ID, token, res);
});

export default router;
