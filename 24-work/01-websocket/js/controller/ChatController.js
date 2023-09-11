export default class ChatController {
    constructor(model, view, ws) {
        this.model = model;
        this.view = view;
        this.ws = ws;

        this.view.bindSendMessage(this.handleSendMessage.bind(this));
        this.ws.onmessage = this.handleMessageReceived.bind(this);
    }

    handleSendMessage(username, message) {
        if (username && message) {
            this.view.clearMessageInput();
            this.ws.send(JSON.stringify({ username, message }));
        }
    }

    handleMessageReceived(event) {
        const messageData = JSON.parse(event.data);
        this.model.addMessage(messageData.username, messageData.message);
        this.view.renderMessages(this.model.getMessages());
    }
}