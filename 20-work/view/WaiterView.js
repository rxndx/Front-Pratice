export const LI_ELEMENT = "li";
export const SPAN_ELEMENT = "span";
export const INPUT_ELEMENT = "input";

export const WAITERS_LIST = '#waitersList'
export const FIRST_NAME_INPUT = '#firstName'
export const PHONE_INPUT = '#phone'
export const EDIT_FIRST_NAME = 'edit-firstName';
export const EDIT_PHONE = 'edit-phone';
export const EDIT_CONTAINER = "edit-container";

export const SAVE_BUTTON = '#save'
export const EDIT_BUTTON = "edit";
export const SAVE_EDIT_BUTTON = "save-edit";
export const DELETE_BUTTON = "delete";

const DISPLAY_BLOCK = "block";
const DISPLAY_BLOCK_NONE = "none";

export default class WaiterView {
    constructor(controller, model) {
        this.model = model;
        this.controller = controller;

        this.waitersListElement = document.querySelector(WAITERS_LIST);
        this.firstNameInput = document.querySelector(FIRST_NAME_INPUT);
        this.phoneInput = document.querySelector(PHONE_INPUT);
        this.saveButton = document.querySelector(SAVE_BUTTON);

        this.saveButton.addEventListener('click', this.handleSaveButtonClick.bind(this));
        this.waitersListElement.addEventListener('click', this.handleWaitersListClick.bind(this));
    }

    renderWaiters() {
        this.waitersListElement.innerHTML = this.model.waitersList.map(waiter => `
            <li data-id="${waiter.id}">
                <span>${waiter.firstName}</span>
                <span>${waiter.phone}</span>
                <button class="${EDIT_BUTTON}">Edit</button>
                <button class="${DELETE_BUTTON}">Delete</button>
                <div class="${EDIT_CONTAINER}" style="display: none;">
                    <input type="text" class="${EDIT_FIRST_NAME}" placeholder="First Name">
                    <input type="text" class="${EDIT_PHONE}" placeholder="Phone">
                    <button class="${SAVE_EDIT_BUTTON}">Save</button>
                </div>
            </li>
        `).join('');
    }

    async handleSaveButtonClick(e) {
        e.preventDefault();

        const firstName = this.firstNameInput.value;
        const phone = this.phoneInput.value;

        if (!this.isInputValid(firstName, phone)) {
            this.showAlert('Please fill in all fields.');
            return;
        }

        try {
            await this.model.createWaiter(firstName, phone);
            await this.controller.init();
            this.clearInputFields();
        } catch (error) {
            this.showAlert(error.message);
        }
    }

    async handleWaitersListClick(e) {
        const target = e.target;
        const li = target.closest(LI_ELEMENT);
        const id = li.dataset.id;
        const editContainer = li.querySelector(`.${EDIT_CONTAINER}`);

        if (target.classList.contains(EDIT_BUTTON)) {
            await this.handleEditClick(li);
        } else if (target.classList.contains(DELETE_BUTTON)) {
            await this.handleDeleteClick(li, id);
        } else if (target.classList.contains(SAVE_EDIT_BUTTON)) {
            await this.handleSaveEditClick(li, id, editContainer);
        }
    }

    async handleEditClick(li) {
        const [firstNameSpan, phoneSpan] = li.querySelectorAll(SPAN_ELEMENT);

        this.showEditContainer(
            li.querySelector(`.${EDIT_CONTAINER}`),
            firstNameSpan.textContent,
            phoneSpan.textContent
        );
    }

    async handleDeleteClick(li, id) {
        if (confirm('Are you sure you want to delete this waiter?')) {
            try {
                await this.model.deleteWaiter(id);
                await this.controller.init();
            } catch (error) {
                this.showAlert(error.message);
            }
        }
    }

    async handleSaveEditClick(li, id, editContainer) {
        const [editFirstNameInput, editPhoneInput] = editContainer.querySelectorAll(INPUT_ELEMENT);

        try {
            await this.model.updateWaiter(id, {
                firstName: editFirstNameInput.value,
                phone: editPhoneInput.value
            });
            this.hideEditContainer(editContainer);
            await this.controller.init();
        } catch (error) {
            this.showAlert(error.message);
        }
    }

    showEditContainer(editContainer, firstName, phone) {
        editContainer.style.display = DISPLAY_BLOCK;

        const [editFirstNameInput, editPhoneInput] = editContainer.querySelectorAll(`.${EDIT_FIRST_NAME}, .${EDIT_PHONE}`);

        editFirstNameInput.value = firstName;
        editPhoneInput.value = phone;
    }

    hideEditContainer(editContainer) {
        editContainer.style.display = DISPLAY_BLOCK_NONE;
    }

    isInputValid(firstName, phone) {
        return firstName.trim() && phone.trim();
    }

    clearInputFields() {
        this.firstNameInput.value = '';
        this.phoneInput.value = '';
    }

    showAlert(message) {
        alert(message);
    }
}