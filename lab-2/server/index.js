const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });
let clients = [];

function prepareMessage(message, socket) {
  const client = clients.find((client) => client.socket === socket);
  message.sender = client.username;
  message.body = `${client.username}: ` + message.body;
  message.onlineUsers = clients.map((client) => {
    return client.username;
  });
  return message;
}
function broadcastMessage(message) {
  clients.forEach((client) => {
    if (client.socket.readyState === WebSocket.OPEN) {
      client.socket.send(JSON.stringify(message));
    }
  });
}

wss.on("connection", function (socket) {
  console.log(`A new connection has been established ${socket}`);

  socket.on("message", function (message) {
    const data = JSON.parse(message);
    if (data.username) {
      clients.push({ username: data.username, socket });
      console.log(`${data.username} has joined the chat`);
    } else {
      console.log("Received message: " + message);
      broadcastMessage(prepareMessage(data, socket));
    }
  });

  socket.on("close", function () {
    let clientIdx = clients.findIndex((client) => {
      return client.socket === socket;
    });
    console.log(`${clients[clientIdx].username} has left the chat`);
    clients.splice(clientIdx, 1);
  });
});

console.log("WebSocket server is running on ws://localhost:3000");
