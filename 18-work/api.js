export class Api {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async request(url = '', method = 'GET', data = null) {
        const requestOptions = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (data) {
            requestOptions.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(`${this.baseUrl}${url}`, requestOptions);

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            return response.json();
        } catch (error) {
            throw new Error(`Request error: ${error.message}`);
        }
    }

    async getList() {
        try {
            return await this.request();
        } catch (error) {
            throw new Error(`Cannot fetch list: ${error.message}`);
        }
    }

    async create(todo) {
        try {
            return await this.request('', 'POST', todo);
        } catch (error) {
            throw new Error(`Cannot create: ${error.message}`);
        }
    }

    async update(id, todo) {
        try {
            return await this.request(id, 'PUT', todo);
        } catch (error) {
            throw new Error(`Cannot update: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            await this.request(id, 'DELETE');
        } catch (error) {
            throw new Error(`Cannot delete: ${error.message}`);
        }
    }
}