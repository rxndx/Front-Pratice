import {Api} from "../lib/api.js";
import {waitersUrl} from "../lib/url.js";

const EDIT_CONTAINER = "edit-container";

const LI_ELEMENT = "li";
const SPAN_ELEMENT = "span";
const INPUT_ELEMENT = "input";
const DISPLAY_BLOCK = "block";
const DISPLAY_BLOCK_NONE = "none";

const EDIT_BUTTON = "edit";
const DELETE_BUTTON = "delete";
const SAVE_EDIT_BUTTON = "save-edit";

export default class WaitersApp {
    constructor() {
        this.api = new Api(waitersUrl);

        this.waitersList = [];

        this.waitersListElement = document.querySelector('#waitersList');
        this.firstNameInput = document.querySelector('#firstName');
        this.phoneInput = document.querySelector('#phone');
        this.saveButton = document.querySelector('#save');

        this.saveButton.addEventListener('click', this.handleSaveButtonClick.bind(this));
        this.waitersListElement.addEventListener('click', this.handleWaitersListClick.bind(this));

        this.init().then(() => this.showAlert("Waiters loaded successfully."));
    }

    async init() {
        try {
            this.waitersList = await this.api.getList();
            this.renderWaiters();
        } catch (error) {
            this.showAlert(`Error: ${error.message}`);
        }
    }

    async handleSaveButtonClick(e) {
        e.preventDefault();

        if (this.isInputInvalid()) {
            this.showAlert('Please fill in all fields.');
            return;
        }

        await this.createWaiter();
    }

    async handleWaitersListClick(e) {
        const target = e.target;
        if (target.classList.contains(EDIT_BUTTON)) {
            this.showEditContainer(target);
        } else if (target.classList.contains(DELETE_BUTTON)) {
            await this.handleDeleteClick(target);
        } else if (target.classList.contains(SAVE_EDIT_BUTTON)) {
            await this.handleSaveEditClick(target);
        }
    }

    async handleSaveEditClick(target) {
        const li = target.closest(LI_ELEMENT);
        const id = li.dataset.id;

        const editContainer = li.querySelector(`.${EDIT_CONTAINER}`);
        const [editFirstNameInput, editPhoneInput] = editContainer.querySelectorAll(INPUT_ELEMENT);

        await this.updateWaiter(id, { firstName: editFirstNameInput.value, phone: editPhoneInput.value });
        editContainer.style.display = DISPLAY_BLOCK_NONE;
    }

    async handleDeleteClick(target) {
        const li = target.closest(LI_ELEMENT);
        const id = li.dataset.id;

        if (confirm('Are you sure you want to delete this waiter?')) {
            await this.deleteWaiter(id);
        }
    }

    createWaiterObject(firstName, phone) {
        return {
            firstName: firstName.trim(),
            phone: phone.trim()
        };
    }

    async createWaiter() {
        try {
            const newWaiter = this.createWaiterObject(this.firstNameInput.value, this.phoneInput.value);
            await this.api.create(newWaiter);
            await this.init();
            this.clearInputFields();
        } catch (error) {
            this.showAlert(`Error: ${error.message}`);
        }
    }

    async updateWaiter(id, updated) {
        try {
            const waiterIndex = this.waitersList.findIndex(item => item.id === parseInt(id));

            if (waiterIndex === -1) throw new Error("Waiter not found.");

            const updatedWaiter = { ...this.waitersList[waiterIndex], ...updated };

            await this.api.update(id, updatedWaiter);
            await this.init();
        } catch (error) {
            this.showAlert(`Error: ${error.message}`);
        }
    }

    async deleteWaiter(id) {
        try {
            await this.api.delete(id);
            await this.init();
        } catch (error) {
            this.showAlert(`Error: ${error.message}`);
        }
    }

    showEditContainer(target) {
        const li = target.closest(LI_ELEMENT);
        const editContainer = li.querySelector(`.${EDIT_CONTAINER}`);
        editContainer.style.display = DISPLAY_BLOCK;

        const [firstNameSpan, phoneSpan] = li.querySelectorAll(SPAN_ELEMENT);
        const [editFirstNameInput, editPhoneInput] = editContainer.querySelectorAll(INPUT_ELEMENT);

        editFirstNameInput.value = firstNameSpan.textContent;
        editPhoneInput.value = phoneSpan.textContent;
    }

    renderWaiters() {
        this.waitersListElement.innerHTML = this.waitersList.map(waiter => `
        <li data-id="${waiter.id}">
            <span>${waiter.firstName}</span>
            <span>${waiter.phone}</span>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
            <div class="edit-container" style="display: none;">
                <input type="text" class="edit-firstName" placeholder="First Name">
                <input type="text" class="edit-phone" placeholder="Phone">
                <button class="save-edit">Save</button>
            </div>
        </li>
    `).join('');
    }

    isInputInvalid() {
        return !this.firstNameInput.value.trim() || !this.phoneInput.value.trim();
    }

    clearInputFields() {
        this.firstNameInput.value = '';
        this.phoneInput.value = '';
    }

    showAlert(message) {
        alert(message);
    }
}