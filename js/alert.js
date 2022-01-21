import { selectDomElement } from "./utils/utils.js";

export function toastMessage({ msg, heading, autoclose, timeout = 3000 }) {
  const notificationBox = selectDomElement(".notification");
  if (notificationBox) notificationBox.remove();
  const template = `<div class="notification" id="notification">
        <div class="notification__icon-background"></div>
        <div class="notification__icon"><img src="https://img.icons8.com/cotton/64/000000/info--v5.png" /></div>
        <div class="notification__text-container">
            <h4 class="dc-text notification__header">${heading}</h4>
            ${
              typeof msg === "object"
                ? msg
                    .map((i) => `<li class="notification__text-body">${i}</li>`)
                    .join("")
                : `<p class="notification__text-body">${msg}</p>`
            }
           
            <div class="notification__action"></div>
        </div><button class="notification__close-button" type="button" aria-label="Close" onclick="getElementById('notification').classList.remove('notification--enter')"></button>
    </div>`;
  if (document.querySelector(".notification")) return;
  document.querySelector("body").insertAdjacentHTML("beforeend", template);
  setTimeout(function () {
    selectDomElement(".notification").classList.add("notification--enter");
  }, 10);

  if (autoclose)
    setTimeout(function () {
      selectDomElement(".notification").classList.remove("notification--enter");
    }, timeout);
}

export function showLoadingSpinner(text = "Loading...") {
  const template = `  <div class="loading">
        <svg width="205" height="250" viewBox="0 0 40 50">
            <polygon stroke="#fff" strokeWidth="1" fill="none" points="20,1 40,40 1,40" />
            <text fill="#fff" x="5" y="47">${text}</text>
        </svg>
    </div>`;
  selectDomElement("body").insertAdjacentHTML("beforeend", template);
}
