const password = encodeURIComponent('mit@123');
import mongoose from "mongoose";
import instrumentModel from '../models/instrument.js'
mongoose.connect(
    `mongodb+srv://admin:${password}@robotrade.5inrp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {},
    (error,db) => {
        if(error) {
            console.error('unable to connect database')
        } else {
            console.log('DB connected successfully')
        }
    }
);

mongoose.Promise = global.Promise;
export default {
    instrumentModel
}
