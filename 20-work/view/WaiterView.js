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

export const DISPLAY_BLOCK = "block";
export const DISPLAY_BLOCK_NONE = "none";

export default class WaiterView {
    constructor() {
        this.waitersListElement = document.querySelector(WAITERS_LIST);
        this.firstNameInput = document.querySelector(FIRST_NAME_INPUT);
        this.phoneInput = document.querySelector(PHONE_INPUT);
        this.saveButton = document.querySelector(SAVE_BUTTON);
    }

    renderWaiters(waitersList) {
        this.waitersListElement.innerHTML = waitersList.map(waiter => `
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