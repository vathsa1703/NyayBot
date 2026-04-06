import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    complainantName:      { type: String, required: true },
    complainantPhone:     { type: String, required: true },
    complainantEmail:     { type: String, default: "" },
    complainantAddress:   { type: String, default: "" },
    oppositeParty:        { type: String, required: true },
    oppositePartyAddress: { type: String, default: "" },
    complaintType:        { type: String, required: true },
    complaintDetails:     { type: String, required: true },
    amount:               { type: String, default: "0" },
    incidentDate:         { type: String, default: "" },
    language:             { type: String, default: "english" },
    generatedNotice:      { type: String, required: true },
    noticeId:             { type: String },
    status:               { type: String, default: "generated" },
  },
  { timestamps: true }
);

const Notice = mongoose.models.Notice || mongoose.model("Notice", noticeSchema);
export default Notice;