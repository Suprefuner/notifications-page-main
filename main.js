"use strict"

// input the datas from other js file
import messages from "./messages.js"

const notificationContainer = document.querySelector(".notification-container")
const numberOfUnreadMsg = document.querySelector(".no-of-unread-msg")
const readBtn = document.querySelector(".btn--mark-read")

const createMessage = function () {
  // count unread messages
  let unreadMsgCounter = 0

  // generate motifications html
  /*
  
  
  */
  const html = messages
    .map((msg) => {
      const {
        imageUrl,
        message,
        name,
        post,
        publishAt,
        status,
        group,
        privateMsg,
        picture,
      } = msg
      if (status === "unread") unreadMsgCounter++
      // prettier-ignore
      return `
        <div class="notification ${
          status === "unread" ? "notification--unread" : ""
        }">
          <div class="profile-pic">
            <img
              src=${imageUrl}
              alt="users profile picture"
            />
          </div>
          <div class="message">
            <span class="user-name">${name}</span> ${message}
            ${group ? `<span class="link link--group">${group}</span>` : ""}
            ${post ? `<span class="link link--post">${post}</span>` : ""}
            ${status === "unread" ? '<span class="dot"></span>' : ""}
            <p class="publish-at">${publishAt}</p>
            ${privateMsg
                ? `<p class="private-msg">${privateMsg}</p>`
                : ``}
          </div>
          ${picture? `
            <img
              src=${picture}
              alt="playing chess"
              class="post-pic"
            />`
            : ``
          }
        </div>
      `
    })
    .join("")

  // render the page
  numberOfUnreadMsg.textContent = unreadMsgCounter
  notificationContainer.innerHTML = ``
  notificationContainer.insertAdjacentHTML("beforeend", html)
}

createMessage()

const markAsRead = () => {
  // change all msg status to read
  messages.map((msg) => (msg.status = "read"))
  // re-render the messages
  createMessage()
}

readBtn.addEventListener("click", markAsRead)
