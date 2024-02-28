import mongoose from "mongoose";

const InstrumentsSchema = new mongoose.Schema({
  exch_seg: {
    type: String,
    required: false,
  },
  expiry: {
    type: String,
    required: false,
  },
  instrumenttype: {
    type: String,
    required: false,
  },
  lotsize: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  strike: {
    type: String,
    required: false,
  },
  symbol: {
    type: String,
    required: false,
  },
  tick_size: {
    type: String,
    required: false,
  },
  token: {
    type: String,
    required: false,
  },
});

const instruments = mongoose.model("Instruments", InstrumentsSchema);

// module.exports = Instruments;
export default instruments;
