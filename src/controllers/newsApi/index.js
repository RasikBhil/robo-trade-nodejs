import express from "express";
import { newsAPIEverything, newsAPITopHeadlines } from "../newsApi/sevices.js";
// import { newsAPI } from "../../services/newsAPI";


const router = express.Router();

router.get("/", (req, res) => {
  newsAPIEverything(res);
});

router.get("/topheadlines", (req, res) => {
  newsAPITopHeadlines(res);
});

export default router;
