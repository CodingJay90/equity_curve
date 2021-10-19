import express from "express";
import {
  createNewPlan,
  getAllPlanForUser,
  getAllPlans,
} from "../controllers/plan-controller.js";
import { addNewTrade, getAllTrades } from "../controllers/trades-controller.js";
import isLoggedIn from "../utils/check_auth.js";

const router = express.Router();

router.post("/plans/new", createNewPlan); //Create a new plan for user
router.get("/plans/:user_id", isLoggedIn, getAllPlanForUser); //get all plans for existing user
router.get("/plans", isLoggedIn, getAllPlans); //get all plans in db

router.post("/trades/add/:plan_id", addNewTrade); //add trades under a user's plan
router.get("/trades", getAllTrades); //get all Trades in db
export default router;
