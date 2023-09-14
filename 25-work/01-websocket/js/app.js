import ChatModel from '../js/model/ChatModel.js';
import ChatView from '../js/view/ChatView.js';
import ChatController from '../js/controller/ChatController.js';

const ws = new WebSocket('ws://localhost:4000/chat');

const model = new ChatModel();
const view = new ChatView();

new ChatController(model, view, ws);