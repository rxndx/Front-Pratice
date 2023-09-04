import WaiterModel from "../model/WaiterModel.js";
import WaiterView from "../view/WaiterView.js";

export default class WaiterController {
    constructor() {
        this.model = new WaiterModel();
        this.view = new WaiterView(this, this.model);

        this.init().then(() => {
            this.view.showAlert("Waiters loaded successfully.");
        });
    }

    async init() {
        try {
            await this.model.fetchWaitersList();
            this.view.renderWaiters(this.model.waitersList);
        } catch (error) {
            this.view.showAlert(error.message);
        }
    }
}