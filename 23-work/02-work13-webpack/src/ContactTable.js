export default class ContactTable {
    constructor() {
        this.contacts = [];
        this.tableBody = document.querySelector("#contactTable tbody");
    }

    addContact(contact) {
        this.contacts.push(contact);
        this.updateTable();
    }

    deleteContact(index) {
        this.contacts.splice(index, 1);
        this.updateTable();
    }

    createTableRow(contact, index) {
        const row = `
            <tr>
                <td>${contact.name}</td>
                <td>${contact.surname}</td>
                <td>${contact.phoneNumber}</td>
                <td><button class="deleteButton" data-index="${index}">Удалить</button></td>
            </tr>
        `;
        return row;
    }

    updateTable() {
        this.tableBody.innerHTML = "";
        this.contacts.forEach((contact, index) => {
            const row = this.createTableRow(contact, index);
            this.tableBody.insertAdjacentHTML('beforeend', row);
        });
    }
}