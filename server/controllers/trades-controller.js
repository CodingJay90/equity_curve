import Trade from "../model/Trade.js";
import Plan from "../model/Plan.js";

//add trades under a user's plan
export async function addNewTrade(req, res) {
  try {
    const newTrade = await Trade.create(req.body);
    const plan = await Plan.findById(req.params.plan_id);
    plan.trades.push(newTrade);
    await plan.save();

    res.status(200).json({ success: true, trade: newTrade });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
}

//get all Trades in db
export async function getAllTrades(req, res) {
  try {
    const trades = await Trade.find();

    res.status(200).json({ success: true, trades });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}
