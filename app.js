(function () {
  "use strict";

  var path = require('path');
  var app = require('express')();
  var WebSocket = require('ws');


  const ws = new WebSocket('ws://localhost:6001');

  ws.onopen = function () {
    console.log("Connected to WebSocket Server");
  };
  ws.onclose = function (){
    console.log("Desconnected from WebSocket Server");
  };

  ws.onmessage = function (payload) {
    console.log("Message received from Server: " + payload.data);
  };


  let x = (function (authObj) {
    console.log("/auth ws on");

    ws.send(JSON.stringify(authObj));
  });

  app.get('/auth', (req, res) => {
    let authObj = {
      "event" : "auth",
      "command" : {
        "token" : "123128371623="
      }
    };

    console.log("Express connection");
    x(authObj);
    res.send(authObj);

  });


  app.listen(3000, () => console.log("listening on http://localhost:3000"));


})();