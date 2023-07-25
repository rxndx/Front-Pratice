class ContactTable {
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

    updateTable() {
        this.tableBody.innerHTML = "";
        this.contacts.forEach((contact, index) => {
            const row = this.createTableRow(contact, index);
            this.tableBody.appendChild(row);
        });
    }

    createTableRow(contact, index) {
        const row = document.createElement("tr");
        row.innerHTML =
            `<td>${contact.name}</td>
            <td>${contact.surname}</td>
            <td>${contact.phoneNumber}</td>
            <td><button class="deleteButton" data-index="${index}">Удалить</button></td>`
        ;
        return row;
    }
}