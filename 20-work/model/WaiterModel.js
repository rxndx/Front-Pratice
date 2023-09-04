import { Api } from "../../lib/api.js";
import { waitersUrl } from "../../lib/url.js";

export default class WaiterModel {
    constructor() {
        this.api = new Api(waitersUrl);
        this.waitersList = [];
    }

    async fetchWaitersList() {
        try {
            this.waitersList = await this.api.getList();
        } catch (error) {
            throw error;
        }
    }

    async createWaiter(firstName, phone) {
        try {
            const newWaiter = { firstName: firstName.trim(), phone: phone.trim() };
            const createdWaiter = await this.api.create(newWaiter);

            this.waitersList.push(createdWaiter);
            return createdWaiter;
        } catch (error) {
            throw error;
        }
    }

    async updateWaiter(id, updatedWaiter) {
        try {
            await this.api.update(id, updatedWaiter);
            this.updateLocalWaiter(parseInt(id), updatedWaiter);
        } catch (error) {
            throw error;
        }
    }

    async deleteWaiter(id) {
        try {
            await this.api.delete(id);
            this.deleteLocalWaiter(parseInt(id));
        } catch (error) {
            throw error;
        }
    }

    updateLocalWaiter(id, updated) {
        this.waitersList = this.waitersList.map(waiter =>
            waiter.id === id ? { ...waiter, ...updated } : waiter
        );
    }

    deleteLocalWaiter(id) {
        this.waitersList = this.waitersList.filter(waiter => waiter.id !== id);
    }
}