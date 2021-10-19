import { callApi } from "./api.js";

const signupForm = document.querySelector("#signup-form");
const loginForm = document.querySelector("#login-form");

function registerUser(e) {
  e.preventDefault();

  callApi("");
}

function loginUser(e) {}

signupForm.addEventListener("submit", (e) => registerUser(e));
loginForm.addEventListener("submit", (e) => loginUser(e));
