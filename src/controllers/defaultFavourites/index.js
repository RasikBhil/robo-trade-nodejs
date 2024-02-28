import express from "express";
import {
  getDefaultFavouriteInstuments,
  getTopDefaultFavouriteInstuments,
} from "./services.js";
const router = express.Router();

router.get("/", (req, res) => {
  getDefaultFavouriteInstuments(res);
});
router.get("/topDefaultFavourites", (req, res) => {
  getTopDefaultFavouriteInstuments(res);
});

export default router;
