import schedule from 'node-schedule';


const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(4, 6)];
rule.hour = 17;
rule.minute = 0;

export const job = schedule.scheduleJob(rule, function () {


    console.log('Today is recognized by Rebecca Black!');
});


// const startTime = new Date(Date.now() + 5000);
// const endTime = new Date(startTime.getTime() + 5000);
// export const job = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function () {
//     console.log('Time for tea!');
// });