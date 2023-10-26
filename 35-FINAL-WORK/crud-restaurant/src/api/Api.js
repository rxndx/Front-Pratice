export class Api {
    constructor (url) {
        this.url = url
    }

    request(url = '', method = 'GET', body) {
        return fetch(`${this.url}${url}`, {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }

                throw new Error(`${response.status} ${response.statusText}`);
            })
    }

    getList () {
        return this.request()
            .catch((error) => {
                throw new Error(`Can not fitch list: ${error.message}`);
            })
    }

    create (data) {
        return this.request('', 'POST', data)
            .catch((error) => {
                throw new Error(`Can not create: ${error.message}`);
            })
    }

    update (id, data) {
        return this.request(id, 'PUT', data)
            .catch((error) => {
                throw new Error(`Can not update: ${error.message}`);
            })
    }

    delete (id) {
        return this.request(id, 'DELETE')
            .catch((error) => {
                throw new Error(`Can not delete: ${error.message}`);
            })
    }
}