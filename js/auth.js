import { callApi } from "./api.js";
import { config } from "./config.js";
const base_url = config.BACKEND_URL;

const signupForm = document.querySelector("#signup-form");
const loginForm = document.querySelector("#login-form");

async function registerUser(e) {
  const url = `${base_url}/api/v1/user/create`;
  e.preventDefault();
  const body = {
    email: signupForm.email.value,
    first_name: signupForm.first_name.value,
    last_name: signupForm.last_name.value,
    password: signupForm.password.value,
    username: signupForm.user_name.value,
    avatar:
      "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
  };

  const result = await callApi(url, "POST", body);

  if (result.success) {
    localStorage.setItem("user_details", JSON.stringify(result.user));
    localStorage.setItem("auth_token", result.token);
    alert("signup success");
  }
  console.log(result);
}

async function loginUser(e) {
  const url = `${base_url}/api/v1/user/login`;
  e.preventDefault();
  const body = {
    email: loginForm.email.value,
    password: loginForm.password.value,
  };

  const result = await callApi(url, "POST", body);
  if (result.success) {
    localStorage.setItem("user_details", JSON.stringify(result.user));
    localStorage.setItem("auth_token", result.token);
    alert("login success");
  }
  console.log(result);
}

signupForm.addEventListener("submit", (e) => registerUser(e));
loginForm.addEventListener("submit", (e) => loginUser(e));
