import db from "../../datasource/index.js";
const favourites = db.favouritesModel;

export const successRes = (data) => {
  return {
    status: true,
    result: data,
  };
};

export const errorRes = (errorCode, message) => {
  return {
    status: false,
    result: null,
    message: message,
    errorCode: errorCode,
  };
};

const addToFavourite = async (client_ID, token, res) => {
  if (client_ID && token) {
    const isExist = await favourites.findOne({ client_ID: client_ID });
    console.log("IS EXIST", isExist);
    // console.log("IS EXIST", !isExist.favourites.includes(token));
    // if (!isExist.favourites.includes(token)) {
    if (isExist) {
      if (
        isExist &&
        isExist.favourites.length > 0 &&
        isExist.favourites.includes(token)
      ) {
        res
          .status(200)
          .json({ success: false, result: "instument already exists" });
        return;
      }

      favourites
        .findOneAndUpdate(
          { _id: isExist._id },
          { $push: { favourites: token } },
          {
            returnOriginal: true,
            upsert: true,
            useFindAndModify: false,
          }
        )
        .then(() => {
          res
            .status(200)
            .json({ success: true, result: "instument added successfully" });
        });
    } else {
      const doc = {
        client_ID: client_ID,
        favourites: [token],
      };
      favourites.create(doc).then(() =>
        res.status(200).json({
          success: true,
          result: "new client_ID and instument added successfully",
        })
      );
    }
  } else {
    res.status(200).json(errorRes("INST001", "Client_ID cannot be null!"));
  }
};

const deleteFromFavourite = async (client_ID, token, res) => {
  if (client_ID) {
    const isExist = await favourites.findOne({ client_ID: client_ID });
    if (isExist) {
      favourites
        .findOneAndUpdate(
          { _id: isExist._id },
          { $pull: { favourites: token } }
        )
        .then((evt) => {
          res.status(200).json({
            success: true,
            result: `instument deleted successfully = ${evt}`,
          });
        })
        .catch((e) => {
          console.log("error", e);
          console.log("====================================");
          res.json({
            success: false,
            result: `Error on instument delete = ${e} `,
          });
        });
    } else {
      res.json(errorRes("INST002", "item not found with given client_ID"));
    }
  } else {
    res.json(errorRes("INST001", "Client_ID cannot be null!"));
  }
};

export { addToFavourite, deleteFromFavourite };
