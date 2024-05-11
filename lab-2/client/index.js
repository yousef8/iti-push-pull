const chatArea = document.getElementById("chat-area");
const sendButton = document.getElementById("send-button");
const sendMessage = document.getElementById("message");
const onlineUsersDiv = document.getElementById("online-users");

document.addEventListener("DOMContentLoaded", function () {
  const username = prompt("Enter your username?");
  const h1 = document.createElement("h1");
  h1.textContent = `User #${username}`;
  document.getElementById("main-container").prepend(h1);

  const socket = new WebSocket("ws://localhost:3000");

  socket.addEventListener("open", function () {
    console.log("Connected to the server");
    socket.send(JSON.stringify({ username: username }));
  });

  socket.addEventListener("message", function (event) {
    const message = JSON.parse(event.data);
    console.log(message);
    if (message.sender == username) {
      chatArea.innerHTML += `<div style="direction: rtl;"><h4 class="d-inline-block w-auto rounded" style=" background: antiquewhite;">${message.body}</h4> </div>`;
    } else {
      chatArea.innerHTML += `<div> <h4 class="d-inline-block w-auto rounded" style="background: aquamarine;">${message.body}</h4> </div>`;
    }
    let onlineUsers = message.onlineUsers;
    onlineUsersDiv.innerHTML = "";
    onlineUsers.forEach((user) => {
      onlineUsersDiv.innerHTML += `<li>${user}</li>`;
    });
  });

  socket.addEventListener("close", function () {
    console.log("Disconnected from the server");
  });

  socket.addEventListener("error", function (error) {
    console.error("WebSocket error: ", error);
  });

  sendButton.addEventListener("click", () => {
    socket.send(JSON.stringify({ body: sendMessage.value }));
    sendMessage.value = "";
  });

  socket.onerror = function (event) {
    chatArea.innerHTML += `<h2 style="color:red;">Error connecting to server</h2>`;
  };
});
