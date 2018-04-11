var path = require('path');
var app = require('express')();
var WebSocket = require('ws');


const ws = new WebSocket('ws://localhost:3002');

ws.onopen = function () {
  console.log("Connected to WebSocket Server");
};
ws.onclose = function (){
  console.log("Desconnected from WebSocket Server");
};

ws.onmessage = function (payload) {
  console.log("Message received from Server: " + payload.data);
};

app.get('/auth', (req, res) => {
  let authObj = {
    "event" : "auth",
    "command" : {
      "token" : "123128371623="
    }
  };

  console.log("Express connection");
  ws.on('auth', () => {
    ws.send(authObj);
  });
});

/*
(function(){
  ws.on('message', () => {
    ws.send("X");
  });
}) ();
*/

app.listen(3000, () => console.log("listening on http://localhost:3000"));

