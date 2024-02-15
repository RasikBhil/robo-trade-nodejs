import schedule from 'node-schedule';
import { deleteInstruments } from '../controllers/instruments/services.js'

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 8;
// rule.minute = 5;
// rule.second = 30;

export const job = schedule.scheduleJob(rule, function () {

    deleteInstruments();
    console.log('instrument deleted successfully!================================');
    fetch('http://localhost:3030/instruments/add-instruments');
    console.log('New instrument Data are being added might take 2 minutes!================================');
});