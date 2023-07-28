const TODO_LIST_SELECTOR = "#todoList";
const MSG_INPUT_SELECTOR = "#msgInput";
const MSG_BUTTON_SELECTOR = "#msgButton";

const DELETE_BUTTON = "delete-button";
const GREEN_CLASS = "green";

class TodoListManager {
    constructor() {
        this.todoList = document.querySelector(TODO_LIST_SELECTOR);
        this.msgInput = document.querySelector(MSG_INPUT_SELECTOR);
        this.msgButton = document.querySelector(MSG_BUTTON_SELECTOR);

        this.msgButton.addEventListener("click", this.handleButtonClick.bind(this));
        this.todoList.addEventListener("click", this.handleListClick.bind(this));
    }

    handleButtonClick() {
        const inputValue = this.getInputValue();
        if (inputValue) {
            this.addListItem(inputValue);
            this.clearInput();
        }
    }

    handleListClick(event) {
        const listItem = event.target.closest("li");
        if (listItem) {
            if (event.target.classList.contains(DELETE_BUTTON)) {
                this.deleteListItem(listItem);
            } else {
                this.toggleColor(listItem);
            }
        }
    }

    getInputValue() {
        return this.msgInput.value.trim();
    }

    addListItem(text) {
        const listItemHTML = `<li>${text} <button class="${DELETE_BUTTON}">Удалить</button></li>`;
        this.todoList.insertAdjacentHTML("beforeend", listItemHTML);
    }

    toggleColor(listItem) {
        listItem.classList.toggle(GREEN_CLASS);
    }

    deleteListItem(listItem) {
        listItem.remove();
    }

    clearInput() {
        this.msgInput.value = "";
    }
}

todoListManager = new TodoListManager();
