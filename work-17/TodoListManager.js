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

        this.loadTodos().then(() => {
            this.showAlert("Load successfully.");
        });
    }

    async handleButtonClick() {
        const inputValue = this.getInputValue();
        if (inputValue) {
            await this.addTodoOnServer(inputValue);
            this.clearInput();
            await this.loadTodos();
        }
    }

    async handleListClick(event) {
        const listItem = event.target.closest("li");
        if (listItem) {
            if (event.target.classList.contains(DELETE_BUTTON)) {
                const todoId = listItem.dataset.todoId;
                await this.deleteTodoOnServer(todoId);
                listItem.remove();
            } else {
                const todoId = listItem.dataset.todoId;
                const done = !listItem.classList.contains(GREEN_CLASS);
                await this.toggleTodoStatusOnServer(todoId, done);
                this.toggleColor(listItem);
            }
        }
    }

    async loadTodos() {
        try {
            const response = await fetch("https://mock-api-5678.nw.r.appspot.com/todos/");
            if (!response.ok) {
                throw new Error("Failed to load todos");
            }
            const todos = await response.json();

            this.todoList.innerHTML = "";

            todos.forEach(todo => this.addListItem(todo.title, todo.id, todo.done));
        } catch (error) {
            this.showAlert("Error loading todos: " + error.message);
        }
    }

    async addTodoOnServer(title, done = false) {
        try {
            const response = await fetch("https://mock-api-5678.nw.r.appspot.com/todos/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, done }),
            });

            if (!response.ok) {
                throw new Error("Failed to add todo");
            }

            const newTodo = await response.json();
            return newTodo;
        } catch (error) {
            this.showAlert("Error adding todo: " + error.message);
            throw error;
        }
    }

    async deleteTodoOnServer(todoId) {
        try {
            const response = await fetch(`https://mock-api-5678.nw.r.appspot.com/todos/${todoId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete todo");
            }
        } catch (error) {
            this.showAlert("Error deleting todo: " + error.message);
        }
    }

    async toggleTodoStatusOnServer(todoId, done) {
        try {
            const listItem = this.todoList.querySelector(`[data-todo-id="${todoId}"]`);
            const currentTitle = listItem.dataset.title;
            const response = await fetch(`https://mock-api-5678.nw.r.appspot.com/todos/${todoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: currentTitle, done }),
            });

            if (!response.ok) {
                throw new Error("Failed to update todo status");
            }
        } catch (error) {
            this.showAlert("Error updating todo status: " + error.message);
        }
    }

    addListItem(title, id, done) {
        const listItemHTML = `<li data-todo-id="${id}" data-title="${title}" class="${done ? GREEN_CLASS : ''}">${title} <button class="${DELETE_BUTTON}">Удалить</button></li>`;
        this.todoList.insertAdjacentHTML("beforeend", listItemHTML);
    }

    toggleColor(listItem) {
        listItem.classList.toggle(GREEN_CLASS);
    }

    getInputValue() {
        return this.msgInput.value.trim();
    }

    clearInput() {
        this.msgInput.value = "";
    }

    showAlert(message) {
        alert(message);
    }
}