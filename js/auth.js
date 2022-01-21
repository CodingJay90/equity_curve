import { toastMessage, showLoadingSpinner } from "./alert.js";
import { postApi } from "./services/api.js";
import { config } from "./config.js";
import { setCookie, deleteDomElement } from "./utils/utils.js";

const base_url = config.BACKEND_URL;

const signupForm = document.querySelector("#signup-form");
const loginForm = document.querySelector("#login-form");

function checkProperties(obj) {
  const val = Object.keys(obj).every((i) => obj[i].length > 0);
  return val;
}

async function registerUser(e) {
  e.preventDefault();
  try {
    const body = {
      email: signupForm.email.value,
      first_name: signupForm.first_name.value,
      last_name: signupForm.last_name.value,
      password: signupForm.password.value,
      username: signupForm.user_name.value,
      avatar:
        "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
    };
    if (!checkProperties(body)) {
      toastMessage({
        msg: "Please enter all fields",
        heading: "Error",
      });
      return;
    }

    const result = await postApi(
      `${base_url}/api/v1/user/create`,
      "POST",
      body
    );
    console.log(result);
    if (!result.success) {
      toastMessage({
        msg: result.errors.map((i) => i.msg),
        heading: "Login Error",
        autoclose: true,
      });
      deleteDomElement(".loading");
      return;
    }
    deleteDomElement(".loading");
    setCookie("bearer_token", result.token, 1);
    window.location.href = "../dashboard.html";
  } catch (error) {
    console.log(error);
  }
}

async function loginUser(e) {
  e.preventDefault();
  try {
    const body = {
      email: loginForm.email.value,
      password: loginForm.password.value,
    };
    if (!checkProperties(body)) {
      toastMessage({
        msg: "Please enter all fields",
        heading: "Error",
        autoclose: true,
      });
      return;
    }

    showLoadingSpinner();
    const result = await postApi(`${base_url}/api/v1/user/login`, "POST", body);
    if (!result.success) {
      toastMessage({ msg: result.message, heading: "Login Error" });
      deleteDomElement(".loading");
      return;
    }
    deleteDomElement(".loading");
    setCookie("bearer_token", result.token, 1);
    window.location.href = "../dashboard.html";
  } catch (error) {
    console.log(error);
  }
}

signupForm.addEventListener("submit", (e) => registerUser(e));
loginForm.addEventListener("submit", (e) => loginUser(e));
