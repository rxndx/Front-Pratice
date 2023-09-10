import './style.scss';
import Contact from './contact';
import ContactTable from './contactTable';

const nameInput = document.querySelector("#nameInput");
const surnameInput = document.querySelector("#surnameInput");
const phoneInput = document.querySelector("#phoneInput");
const addButton = document.querySelector("#addButton");

const contactTable = new ContactTable();

addButton.addEventListener("click", onAddBtnClick)
contactTable.tableBody.addEventListener("click", onContTableClick)

function onAddBtnClick () {
  const name = nameInput.value.trim();
  const surname = surnameInput.value.trim();
  const phoneNumber = phoneInput.value.trim();

  const newContact = new Contact(name, surname, phoneNumber);

  if (newContact.isValid()) {
    contactTable.addContact(newContact);
    nameInput.value = "";
    surnameInput.value = "";
    phoneInput.value = "";
  } else {
    alert("Ошибка! Проверьте введенные данные.");
  }
}

function onContTableClick (event) {
  if (event.target.classList.contains("deleteButton")) {
    const index = event.target.dataset.index;
    contactTable.deleteContact(index);
  }
}