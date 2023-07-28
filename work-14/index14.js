class TodoListManager {
    constructor() {
        this.todoList = document.querySelector("#todoList");
        this.msgInput = document.querySelector("#msgInput");
        this.msgButton = document.querySelector("#msgButton");

        this.msgButton.addEventListener("click", this.handleButtonClick.bind(this));
        this.todoList.addEventListener("click", this.handleListClick.bind(this));
    }

    handleButtonClick() {
        const inputValue = this.msgInput.value.trim();
        if (inputValue !== "") {
            this.addListItem(inputValue);
            this.msgInput.value = "";
        }
    }

    handleListClick(event) {
        const listItem = event.target.closest("li");
        if (listItem) {
            if (event.target.classList.contains("delete-button")) {
                this.deleteListItem(listItem);
            } else {
                this.toggleColor(listItem);
            }
        }
    }

    addListItem(text) {
        const listItemHTML = `<li>${text} <button class="delete-button">Удалить</button></li>`;
        this.todoList.insertAdjacentHTML("beforeend", listItemHTML);
    }

    toggleColor(listItem) {
        listItem.classList.toggle("green");
    }

    deleteListItem(listItem) {
        listItem.remove();
    }
}

const todoListManager = new TodoListManager();