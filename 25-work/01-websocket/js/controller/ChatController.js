export default class ChatController {
    constructor(model, view, ws) {
        this.model = model;
        this.view = view;
        this.ws = ws;

        this.view.bindSendMessage(this.handleSendMessage.bind(this));
        this.ws.onmessage = this.handleMessageReceived.bind(this);
    }

    async handleSendMessage(username, message) {
        if (username && message) {
            this.view.clearMessageInput();
            await this.sendWebSocketMessage(username, message);
        }
    }

    async sendWebSocketMessage(username, message) {
        return new Promise((resolve, reject) => {
            this.ws.onopen = () => {
                this.ws.send(JSON.stringify({ username, message }));
                resolve();
            };
            this.ws.onerror = (error) => reject(error);
        });
    }

    async handleMessageReceived(event) {
        const messageData = JSON.parse(event.data);
        this.model.addMessage(messageData.username, messageData.message);
        this.view.renderMessages(this.model.getMessages());
    }
}