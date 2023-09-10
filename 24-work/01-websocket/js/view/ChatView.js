const MESSAGE_LIST = 'message-list';
const MESSAGE_FORM = 'message-form';
const USERNAME_INPUT = 'username-input';
const MESSAGE_INPUT = 'message-input';
const MESSAGE_ITEM = 'message-item';
const SUBMIT_BUTTON = 'submit';

export default class ChatView {
    constructor() {
        this.messageList = document.querySelector(`.${MESSAGE_LIST}`);
        this.messageForm = document.querySelector(`.${MESSAGE_FORM}`);
        this.usernameInput = document.querySelector(`.${USERNAME_INPUT}`);
        this.messageInput = document.querySelector(`.${MESSAGE_INPUT}`);
    }

    createMessageItem(message) {
        return `<div class="${MESSAGE_ITEM}">
      <strong>${message.username}:</strong> ${message.message}
    </div>`;
    }

    renderMessages(messages) {
        this.messageList.innerHTML = messages.map(this.createMessageItem).join('');
    }

    getUsername() {
        return this.usernameInput.value;
    }

    getMessage() {
        return this.messageInput.value;
    }

    clearMessageInput() {
        this.messageInput.value = '';
    }

    bindSendMessage(handler) {
        this.messageForm.addEventListener(SUBMIT_BUTTON, function(event) {
            event.preventDefault();
            handler(this.getUsername(), this.getMessage());
        }.bind(this));
    }
}
