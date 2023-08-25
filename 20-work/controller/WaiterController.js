import WaiterModel from "../model/WaiterModel.js";
import WaiterView, {
    EDIT_BUTTON,
    EDIT_CONTAINER,
    INPUT_ELEMENT,
    LI_ELEMENT,
    SAVE_EDIT_BUTTON,
    SPAN_ELEMENT,
    DELETE_BUTTON
} from "../view/WaiterView.js";

export default class WaiterController {
    constructor() {
        this.model = new WaiterModel();
        this.view = new WaiterView();

        this.isInitialized = false;

        this.view.saveButton.addEventListener('click', this.handleSaveButtonClick.bind(this));
        this.view.waitersListElement.addEventListener('click', this.handleWaitersListClick.bind(this));

        this.init().then(() => this.view.showAlert("Waiters loaded successfully."));
    }

    async init() {
        try {
            if (!this.isInitialized) {
                await this.model.fetchWaitersList();
                this.isInitialized = true;
            }
            this.view.renderWaiters(this.model.waitersList);
        } catch (error) {
            this.view.showAlert(error.message);
        }
    }

    async handleSaveButtonClick(e) {
        e.preventDefault();

        const firstName = this.view.firstNameInput.value;
        const phone = this.view.phoneInput.value;

        if (!this.view.isInputValid(firstName, phone)) {
            this.view.showAlert('Please fill in all fields.');
            return;
        }

        try {
            await this.model.createWaiter(firstName, phone);
            await this.init();
            this.view.clearInputFields();
        } catch (error) {
            this.view.showAlert(error.message);
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

        this.view.showEditContainer(
            li.querySelector(`.${EDIT_CONTAINER}`),
            firstNameSpan.textContent,
            phoneSpan.textContent
        );
    }

    async handleDeleteClick(li, id) {
        if (confirm('Are you sure you want to delete this waiter?')) {
            try {
                await this.model.deleteWaiter(id);
                await this.init();
            } catch (error) {
                this.view.showAlert(error.message);
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
            this.view.hideEditContainer(editContainer);
            await this.init();
        } catch (error) {
            this.view.showAlert(error.message);
        }
    }
}