import express, {json, response} from 'express';
const app = express();
app.use(express.urlencoded({extended:false}))
app.use(express.json())
// const password = encodeURIComponent('mit@123');
// import mongoose from "mongoose";
import instrumentController from './src/controllers/instruments/index.js'

// mongoose.connect(
//     `mongodb+srv://admin:${password}@robotrade.5inrp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
// );
//
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//     console.log("Connected successfully");
// });

app.use('/instruments', instrumentController)
app.get('/',(req, res) => {
    res.send({status:200, message:'working'})
})

const server = app.listen(process.env.PORT || 3030, () => {
    console.log('Server listning on port', 3030)
})
