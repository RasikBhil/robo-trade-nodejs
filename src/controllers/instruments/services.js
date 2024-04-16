import db from "../../datasource/index.js";
import moment from "moment/moment.js";
import fs from "fs";

const instrumentsDB = db.instrumentModel;
const schedularJobsDB = db.schedularJobs;

const addInstruments = (instruments) => {
  const allPromises = instruments.map((instrument) => {
    return new Promise(async (resolve, reject) => {
      try {
        const instrumentModel = new instrumentsDB(instrument);
        instrumentModel
          .save()
          .then((res) => console.log("data added in DB", res));
        resolve({ message: "instruments added" });
      } catch (error) {
        console.log("error", error);
        reject(error);
      }
    });
  });
  console.log("PROMISE", allPromises);
  //  new
  return Promise.all(allPromises).then((res) => console.log("ALL PROMISE"));
};

const deleteInstruments = (res) => {
  instrumentsDB.collection
    .drop()
    .then(() => {
      // console.log("instrument deleted successfully!====================\n");
      addSchedularStatus("Data Deleted");
      fetchInstrumentData(res);
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
        // let counter = 1;
        // const slicedResponseSize = 100;
        // for (let i = 0; i < response.length; i += slicedResponseSize) {
        //   const sliceResponse = response.slice(i, i + slicedResponseSize);
        //   await addInstruments(sliceResponse);
        //   console.log("chunk added", counter);
        //   counter++;
        // }
        // console.log("res", response);

        res
          .status(200)
          .json({ success: true, message: "Data Added Successfully" });
      } catch (e) {
        console.log("error", e);
      }

      // addSchedularStatus("Data Added Successfully");
    })
    .catch((error) => {
      addSchedularStatus("error while adding instrument data , error:-", error);
    });
};

const deleteInstrumentDataFile = () => {
  fs.exists("./src/utils/instrumentData.js", async (exists) => {
    if (exists) {
      //Show in green
      console.log("File exists. Deleting now ...");
      await fs.unlink("./src/utils/instrumentData.js");
    } else {
      //Show in red
      console.log("File not found, so not deleting.");
    }
  });
};

const fetchInstrumentDataIntoFile = () => {
  fetch(
    "https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json"
  )
    .then((resp) => resp.json())
    .then(async (response) => {
      try {
        fs.writeFile(
          "./src/utils/instrumentData.js",
          JSON.stringify(response),
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("Data written to file");
          }
        );
        res
          .status(200)
          .json({ success: true, message: "Data Added Successfully" });
      } catch (e) {
        console.log("error", e);
      }
    })
    .catch((error) => {
      console.log(
        "error while adding instrument data into file, error:-",
        error
      );
    });
};
const addSchedularStatus = async (status) => {
  try {
    await schedularJobsDB.collection.insertOne({
      timeStamp: moment(new Date()).format("llll"),
      status: status,
    });
    // console.log("schedularJob status added successfully of:-", status);
  } catch (e) {
    console.log("error occured while inserting schedular job status");
  }
};

const deleteSchedularStatus = () => {
  schedularJobsDB.collection
    .drop()
    .then(() => {
      console.log("schedularJob collection dropped successfully");
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
  fetchInstrumentDataIntoFile,
  deleteInstrumentDataFile,
};
