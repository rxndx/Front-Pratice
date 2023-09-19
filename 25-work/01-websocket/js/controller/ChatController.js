export default class ChatController {
    constructor(model, view, ws) {
        this.model = model;
        this.view = view;
        this.ws = ws;

        this.view.bindSendMessage(this.handleSendMessage.bind(this));
        this.ws.onmessage = this.handleMessageReceived.bind(this);
    }

    handleSendMessage(data) {
        this.ws.send(JSON.stringify(data));
    }

    handleMessageReceived(event) {
        const messageData = JSON.parse(event.data);
        this.model.addMessage(messageData.username, messageData.message);
        this.view.renderMessages(this.model.getMessages());
    }
}