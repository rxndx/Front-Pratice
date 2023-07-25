class Contact {
    constructor(name, surname, phoneNumber) {
        this.name = name;
        this.surname = surname;
        this.phoneNumber = phoneNumber;
    }

    isValid() {
        return this.name.trim() !== "" && this.surname.trim() !== ""
            && !isNaN(this.phoneNumber) && this.phoneNumber.trim() !== "";
    }
}