import schedule from 'node-schedule';
import { deleteInstruments, deleteSchedularStatus, fetchInstrumentData } from '../controllers/instruments/services.js'

const instrumentRule = new schedule.RecurrenceRule();
instrumentRule.dayOfWeek = [0, new schedule.Range(0, 6)];
instrumentRule.hour = 17;
instrumentRule.minute = 4;
instrumentRule.second = 45;

export const instrumentJob = schedule.scheduleJob(instrumentRule, function () {

    deleteInstruments().then(() => {

        console.log('instrument deleted successfully!================================\n');

        fetchInstrumentData();

    }).catch((e) => {
        console.log("error while deleting instrument data", e);
    });
});


const statusRule = new schedule.RecurrenceRule();
statusRule.dayOfWeek = 1;
statusRule.hour = 7;
// statusRule.minute = 8;
// statusRule.second = 30;


export const statusJob = schedule.scheduleJob(statusRule, function () {

    deleteSchedularStatus();

});