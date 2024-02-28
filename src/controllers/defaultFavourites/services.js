import db from "../../datasource/index.js";
const instruments = db.instrumentModel;

import { watchList } from "../../utils/watchList.js";
import { successRes } from "../favourites/services.js";

export const getDefaultFavouriteInstuments = async (res) => {
  const instrumentModel = await instruments
    .find({
      $or: [{ exch_seg: { $in: ["NSE"] } }],
    })
    .limit(50);
  try {
    res.send(instrumentModel);
  } catch (e) {
    res.status(304).send("error");
  }
};
export const getTopDefaultFavouriteInstuments = (res) => {
  const newWatchlist = watchList.map((item) => {
    return {
      exchName: item.exchName,
      symbolName: item.symbolName,
      token: item.token,
    };
  });

  res.status(200).json(successRes(newWatchlist));
};
