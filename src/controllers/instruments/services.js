import db from "../../datasource/index.js";
const instrumentsDB = db.instrumentModel;

export function addInstruments(instruments) {
  return new Promise.all(
    instruments.map((instrument) => {
      return new Promise(async (resolve, reject) => {
        const instrumentModel = new instrumentsDB(instrument);
        try {
          await instrumentModel.save();
          resolve({ message: "instruments added" });
        } catch (error) {
          reject(error);
        }
      });
    })
  );
}
