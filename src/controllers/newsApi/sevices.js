import moment from "moment";
import NewsAPI from "newsapi";

const apiKey = "6825cc457fb945a396923b2c80c3d51b";
const newsapi = new NewsAPI(apiKey);

let todaysDate = new Date().toLocaleDateString("en-CA");

let d = new Date();
let oldDate = moment(d.setDate(d.getDate() - 1)).format("YYYY-MM-DD");

export const newsAPITopHeadlines = (res) => {
  newsapi.v2
    .topHeadlines({
      q: "stock",
      category: "business",
      language: "en",
      country: "in",
    })
    .then((response) => {
      console.log(response);
      res.status(200).json({ success: true, result: response });
    })
    .catch((e) => {
      console.log("ERROR", e);
      res.status(500).json({ success: false, result: "Error" });
    });
};
export const newsAPIEverything = (res) => {
  console.log(oldDate);
  newsapi.v2
    .everything({
      q: "stock",
      sources: "bbc-news,the-verge",
      domains: "moneycontrol.com",
      from: oldDate,
      to: todaysDate,
      language: "en",
      sortBy: "relevancy",
    })
    .then((response) => {
      // console.log(response);
      res.status(200).json({ success: true, result: response });
    })
    .catch((e) => {
      console.log("ERROR", e);
      res.status(500).json({ success: false, result: "Error" });
    });
};
