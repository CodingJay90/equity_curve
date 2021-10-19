import Plan from "../model/Plan.js";

//get all plans in db
export async function getAllPlans(req, res) {
  try {
    const plans = await Plan.find();

    res.status(200).json({ success: true, plans: plans });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

//Create a new plan for user
export async function createNewPlan(req, res) {
  try {
    const newPlan = await Plan.create(req.body);

    res.status(200).json({ success: true, trade: newPlan });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

//get all plans for existing user
export async function getAllPlanForUser(req, res) {
  try {
    const plans = await Plan.find({ ["user.id"]: req.params.user_id });
    console.log(req.user);

    res.status(200).json({ success: true, plans: plans });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}
