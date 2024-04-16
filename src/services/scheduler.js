import schedule from "node-schedule";
import {
  addSchedularStatus,
  deleteInstruments,
  deleteSchedularStatus,
  fetchInstrumentData,
  fetchInstrumentDataIntoFile,
} from "../controllers/instruments/services.js";

const instrumentRule = new schedule.RecurrenceRule();
instrumentRule.dayOfWeek = [0, new schedule.Range(0, 6)];
instrumentRule.hour = 8;
// instrumentRule.minute = 9;
// instrumentRule.second = 25;

export const instrumentJob = schedule.scheduleJob(instrumentRule, () => {
  fetchInstrumentDataIntoFile();
});

const statusRule = new schedule.RecurrenceRule();
statusRule.dayOfWeek = 1;
statusRule.hour = 7;
// statusRule.minute = 8;
// statusRule.second = 30;

export const statusJob = schedule.scheduleJob(statusRule, function () {
  deleteSchedularStatus();
});
