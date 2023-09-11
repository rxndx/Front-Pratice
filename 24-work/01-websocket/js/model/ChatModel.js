export default class ChatModel {
    constructor() {
        this.messages = [];
    }

    addMessage(username, message) {
        this.messages.push({ username, message });
    }

    getMessages() {
        return this.messages;
    }
}
