import db from "../../datasource/index.js";
import moment from "moment/moment.js";
const instrumentsDB = db.instrumentModel;
const schedularJobsDB = db.schedularJobs;

const addInstruments = (instruments) => {
    const allPromises = instruments.map((instrument) => {
    return new Promise(async (resolve, reject) => {
      try {
        const instrumentModel = new instrumentsDB(instrument);
        instrumentModel.save();
        resolve({ message: "instruments added" });
      } catch (error) {
        console.log('error',error)
        reject(error);
      }
    });
  })
  console.log('PROMISE', allPromises);
  //  new 
   return Promise.all(allPromises).then(res => console.log('ALL PROMISE'));
};

const deleteInstruments = () => {
  instrumentsDB.collection
    .drop()
    .then(() => {
      console.log("instrument deleted successfully!====================\n");
      addSchedularStatus("Data Deleted");
      fetchInstrumentData();
    })
    .catch((e) => {
      addSchedularStatus("Error while Deleting Data");
      console.log("error while deleting instrument data", e);
    });
};

const fetchInstrumentData = (res) => {
  fetch(
    "https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json"
  )
    .then((resp) => resp.json())
    .then(async (response) => {
      // addSchedularStatus("Instrument data is being added");
      try {
        await deleteInstruments()
        await addInstruments(response);
        res.status(200).json({ success: true, message: 'Data Added Successfully'});
      } catch(e) {
        console.log('error',e);
      }
      
      // addSchedularStatus("Data Added Successfully");
    })
    .catch((error) => {
      addSchedularStatus(
        "error while adding instrument data , error:-",
        error
      );
    });
};

const addSchedularStatus = (status) => {
  schedularJobsDB.collection
    .insertOne({ timeStamp: moment(new Date()).format("llll"), status: status })
    .then(() => {
      console.log("schedularJob status added successfully of:-", status);
    })
    .catch((e) => {
      console.log("error occured while inserting schedular job status");
    });
};

const deleteSchedularStatus = () => {
  schedularJobsDB.collection
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
