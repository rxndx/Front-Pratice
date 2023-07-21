'use strict'

const todoList = document.querySelector("#todoList");
const msgInput = document.querySelector("#msgInput");
const msgButton = document.querySelector("#msgButton");

msgButton.addEventListener("click", () => {
    const inputValue = msgInput.value.trim();
    if (inputValue !== "") {
        const listItem = document.createElement("li");
        listItem.textContent = inputValue;
        todoList.appendChild(listItem);
        msgInput.value = "";
    }
});
