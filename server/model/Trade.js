import mongoose from "mongoose";
// import { isEmail } from "validator";

const TradeSchema = new mongoose.Schema(
  {
    asset: {
      type: String,
      required: true,
    },
    date_entered: {
      type: Date,
      default: Date.now(),
    },
    trade_date: {
      type: String,
      required: true,
    },
    amount_win: {
      type: Number,
      default: false,
    },
    note: {
      type: String,
    },
    plan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plans",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Trades", TradeSchema);
