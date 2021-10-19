import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
  {
    plan: {
      type: String,
    },
    start_balance: {
      type: Number,
    },
    tenure: {
      type: String,
    },
    experies_at: {
      type: Date,
    },
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    trades: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trades",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Plan", PlanSchema);
