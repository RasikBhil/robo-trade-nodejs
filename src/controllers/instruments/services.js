import db from "../../datasource/index.js";
const instrumentsDB = db.instrumentModel;

const addInstruments = (instruments) => {
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

const deleteInstruments = async () => {

    await instrumentsDB.collection.drop().then(() => {
        console.log("collection droped successfully");
    }).catch((e) => {
        console.log('====================================');
        console.log("error while deleting whole collection", e);
    });
}



export { addInstruments, deleteInstruments }