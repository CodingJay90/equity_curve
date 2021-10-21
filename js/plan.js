import { postApi } from "./api.js";
import { config } from "./config.js";
const base_url = config.BACKEND_URL;
const userData = JSON.parse(localStorage.getItem("user_details"));

const planForm = document.querySelector("#plan-form");

function getPlanValue() {
  var ele = document.getElementsByName("plan");

  for (var i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      return ele[i].value;
    }
  }
}

async function regsiterPlan(e) {
  const url = `${base_url}/api/v1/plans/new`;
  e.preventDefault();
  const body = {
    plan: getPlanValue(),
    start_balance: planForm.start_balance.value,
    user: {
      id: userData._id,
    },
    expires_at: new Date(),
  };

  const result = await postApi(url, "POST", body);

  if (result.success) {
    localStorage.setItem("user_details", JSON.stringify(result.user));
    localStorage.setItem("auth_token", result.token);
    alert("signup success");
  }
  console.log(result);
}

planForm.addEventListener("submit", (e) => regsiterPlan(e));
