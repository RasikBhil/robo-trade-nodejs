import express from "express";
import { fetchInstrumentDataIntoFile } from "./services.js";
const router = express.Router();
import db from "../../datasource/index.js";
const instruments = db.instrumentModel;
import { data } from "../../utils/instrumentData.js";

router.get("/add-instruments", (req, res) => {
  fetchInstrumentDataIntoFile(res);
});

router.get("/search", async (req, res) => {
  // const regex = new RegExp(req.query.name.toUpperCase());
  const regex = req.query.name.toUpperCase();
  const limit = 10;
  const page = req.query.page;
  // const skip = 10 * (page - 1);

  let filteredData = data.filter((i) => {
    if (
      i.name.includes(regex) ||
      i.symbol.toUpperCase().includes(regex) ||
      i.token.includes(regex) ||
      i.exch_seg.includes(regex)
    ) {
      if (
        i.exch_seg === "NSE" ||
        i.exch_seg === "BSE" ||
        i.exch_seg === "NFO" ||
        i.exch_seg === "BFO"
      ) {
        return i;
      }
    }
  });

  console.log("filtered data|", regex, "|");
  // filteredData = filteredData.slice(limit * page - limit, limit * page);

  // const instrumentModel = await instruments
  //   .find({
  //     $or: [
  //       { name: { $in: [regex] } },
  //       { symbol: { $in: [regex] } },
  //       { token: { $in: [regex] } },
  //       { exch_seg: { $in: [regex] } },
  //     ],
  //   })
  //   .limit(10)
  //   .skip(skip);
  try {
    res.send(filteredData);
  } catch (e) {
    res.status(304).send("error");
  }
});

export default router;
