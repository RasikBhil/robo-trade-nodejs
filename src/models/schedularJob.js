import mongoose from "mongoose";

const SchedularJobsSchema = new mongoose.Schema({
  timeStamp: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
});

const schedularJobs = mongoose.model("SchedularJobs", SchedularJobsSchema);

// module.exports = schedularJobs;
export default schedularJobs;
