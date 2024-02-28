import mongoose from "mongoose";

const FavouritesSchema = new mongoose.Schema({
  client_ID: {
    type: String,
    required: false,
  },
  favourites: {
    type: Array,
    required: false,
  },
});

const favourites = mongoose.model("Favourites", FavouritesSchema);

export default favourites;
