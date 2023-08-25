import {Api} from "../lib/api.js";
import {contactsUrl} from "../lib/url.js";

const CONTACT_LIST_SELECTOR = "#contactList";
const FIRST_NAME_INPUT_SELECTOR = "#firstNameInput";
const LAST_NAME_INPUT_SELECTOR = "#lastNameInput";
const PHONE_INPUT_SELECTOR = "#phoneInput";
const EMAIL_INPUT_SELECTOR = "#emailInput";
const ADD_BUTTON_SELECTOR = "#addButton";
const SAVE_BUTTON_SELECTOR = "#saveButton";

const EDIT_BUTTON = "edit-button";
const DELETE_BUTTON = "delete-button";
const SELECTED_CLASS = "selected";

class ContactListManager {
    constructor() {
        this.contactList = document.querySelector(CONTACT_LIST_SELECTOR);
        this.nameInput = document.querySelector(FIRST_NAME_INPUT_SELECTOR);
        this.lastNameInput = document.querySelector(LAST_NAME_INPUT_SELECTOR);
        this.phoneInput = document.querySelector(PHONE_INPUT_SELECTOR);
        this.emailInput = document.querySelector(EMAIL_INPUT_SELECTOR);
        this.addButton = document.querySelector(ADD_BUTTON_SELECTOR);
        this.saveButton = document.querySelector(SAVE_BUTTON_SELECTOR);

        this.addButton.addEventListener("click", this.handleAddButtonClick.bind(this));
        this.saveButton.addEventListener("click", this.handleSaveButtonClick.bind(this));
        this.contactList.addEventListener("click", this.handleListClick.bind(this));

        this.api = new Api(contactsUrl);

        this.loadContacts().then(() => this.showAlert("Contacts loaded successfully."));
    }

    async handleAddButtonClick() {
        const { firstName, lastName, phone, email } = this.getInputValues();
        if (firstName && lastName && phone && email) {
            await this.addContactOnServer(firstName, lastName, phone, email);
            this.clearInputs();
            await this.loadContacts();
        } else {
            this.showAlert("All fields are required.");
        }
    }

    async handleListClick(event) {
        const listItem = event.target.closest("li");
        if (listItem) {
            if (event.target.classList.contains(DELETE_BUTTON)) {
                const contactId = listItem.dataset.contactId;
                await this.deleteContactOnServer(contactId);
                listItem.remove();
            } else if (event.target.classList.contains(EDIT_BUTTON)) {
                this.selectContact(listItem);
                this.populateForm(listItem);
                this.showSaveButton();
            } else {
                this.selectContact(listItem);
                this.populateForm(listItem);
            }
        }
    }

    async handleSaveButtonClick() {
        const selectedContact = this.contactList.querySelector(`.${SELECTED_CLASS}`);
        if (!selectedContact) {
            this.showAlert("Select a contact to edit.");
            return;
        }

        const { firstName, lastName, phone, email } = this.getInputValues();
        const id = selectedContact.dataset.contactId;

        if (firstName && lastName && phone && email) {
            await this.updateContactOnServer(id, firstName, lastName, phone, email);
            this.clearForm();
            this.hideSaveButton();
            await this.loadContacts();
        } else {
            this.showAlert("All fields are required.");
        }
    }

    async loadContacts() {
        try {
            const contacts = await this.api.getList();
            this.renderContacts(contacts);
        } catch (error) {
            this.showAlert("Error loading contacts: " + error.message);
        }
    }

    async addContactOnServer(firstName, lastName, phone, email) {
        try {
            return await this.api.create({firstName, lastName, phone, email});
        } catch (error) {
            this.showAlert("Error adding contact: " + error.message);
            throw error;
        }
    }

    async updateContactOnServer(id, firstName, lastName, phone, email) {
        try {
            await this.api.update(id, { firstName, lastName, phone, email });
        } catch (error) {
            this.showAlert("Error updating contact: " + error.message);
        }
    }

    async deleteContactOnServer(contactId) {
        try {
            await this.api.delete(contactId);
        } catch (error) {
            this.showAlert("Error deleting contact: " + error.message);
        }
    }

    getInputValues() {
        const firstName = this.nameInput.value.trim();
        const lastName = this.lastNameInput.value.trim();
        const phone = this.phoneInput.value.trim();
        const email = this.emailInput.value.trim();
        return { firstName, lastName, phone, email };
    }

    renderContacts(contacts) {
        this.contactList.innerHTML = contacts.map(contact => this.createContactItem(contact)).join("");
    }

    createContactItem(contact) {
        return `<li data-contact-id="${contact.id}" class="${SELECTED_CLASS}">
            <span>${contact.firstName} ${contact.lastName}</span>
            <span>${contact.phone}</span>
            <span>${contact.email}</span>
            <button class="${DELETE_BUTTON}">Удалить</button>
            <button class="${EDIT_BUTTON}">Редактировать</button>
        </li>`;
    }

    selectContact(contactItem) {
        const selectedContact = this.contactList.querySelector(`.${SELECTED_CLASS}`);
        if (selectedContact) {
            selectedContact.classList.remove(SELECTED_CLASS);
        }
        contactItem.classList.add(SELECTED_CLASS);
    }

    populateForm(contactItem) {
        const nameParts = contactItem.querySelector("span:first-child").textContent.split(" ");
        const [firstName, ...lastName] = nameParts;
        const phone = contactItem.querySelector("span:nth-child(2)").textContent;
        const email = contactItem.querySelector("span:nth-child(3)").textContent;

        this.nameInput.value = firstName;
        this.lastNameInput.value = lastName.join(" ");
        this.phoneInput.value = phone;
        this.emailInput.value = email;
    }

    clearForm() {
        this.clearInputs();
        const selectedContact = this.contactList.querySelector(`.${SELECTED_CLASS}`);
        if (selectedContact) {
            selectedContact.classList.remove(SELECTED_CLASS);
        }
    }

    clearInputs() {
        this.nameInput.value = "";
        this.lastNameInput.value = "";
        this.phoneInput.value = "";
        this.emailInput.value = "";
    }

    showAlert(message) {
        alert(message);
    }

    showSaveButton() {
        this.saveButton.style.display = "block";
    }

    hideSaveButton() {
        this.saveButton.style.display = "none";
    }
}

export default ContactListManager;