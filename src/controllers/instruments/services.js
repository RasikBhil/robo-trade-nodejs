import db from "../../datasource/index.js";
import moment from "moment/moment.js";
const instrumentsDB = db.instrumentModel;
const schedularJobsDB = db.schedularJobs;

const addInstruments = (instruments) => {
  // return new Promise.all(
  return instruments.map((instrument) => {
    return new Promise(async (resolve, reject) => {
      const instrumentModel = new instrumentsDB(instrument);
      try {
        await instrumentModel.save();
        resolve({ message: "instruments added" });
      } catch (error) {
        reject(error);
      }
    });
  });
  // );
};

const deleteInstruments = async () => {
  await instrumentsDB.collection
    .drop()
    .then(() => {
      console.log("instrument collection droped successfully");
    })
    .catch((e) => {
      console.log("error while deleting whole instrument collection", e);
    });
};

const fetchInstrumentData = () => {
  fetch(
    "https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json"
  )
    .then((res) => res.json())
    .then(async (response) => {
      try {
        await addInstruments(response);

        addSchedularStatus("Data Added Successfully");
      } catch (error) {
        console.log("=================ERROR===================");
        console.log(error);
        console.log("====================================");
        addSchedularStatus(
          "error while adding instrument data , error:-",
          JSON.stringify(error)
        );
      }
    });
};

const addSchedularStatus = async (status) => {
  await schedularJobsDB.collection
    .insertOne({ timeStamp: moment(new Date()).format("llll"), status: status })
    .then(() => {
      console.log("schedularJob status added successfully of:-", status);
    })
    .catch((e) => {
      console.log("error occured while inserting schedular job status", e);
    });
};

const deleteSchedularStatus = async () => {
  await schedularJobsDB.collection
    .drop()
    .then(() => {
      console.log("schedularJob collection droped successfully");
    })
    .catch((e) => {
      console.log("error while deleting whole schedularJob collection", e);
    });
};

export {
  addInstruments,
  deleteInstruments,
  fetchInstrumentData,
  addSchedularStatus,
  deleteSchedularStatus,
};
