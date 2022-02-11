var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static('public'));

var lib = require("./public/lib");
var EVENT_TYPE = lib.EVENT_TYPE;

var onlineUsers = {};
var userSockets = {};


io.on('connection', function (socket) {
  var uid = Math.floor(Math.random() * 10000);
  onlineUsers[socket.id] = uid;
  userSockets[socket.id] = socket;
  io.emit('connect status', 'user ' + onlineUsers[socket.id] + ' connected', onlineUsers);

  socket.on('disconnect', function () {
    var tmp = onlineUsers[socket.id];
    delete onlineUsers[socket.id];
    io.emit('connect status', 'user ' + tmp + ' disconnected', onlineUsers);
  });

  socket.on('typing', function (from) {
    socket.broadcast.emit('typing', from == '' ? '' : from + ' is typing');
  });

  socket.on('chat message', function (msg) {
    socket.broadcast.emit('chat message', onlineUsers[socket.id], msg);
  });

  socket.on('modify nickname', function (oldname, nickname) {
    onlineUsers[socket.id] = nickname;
    io.emit('chat message', onlineUsers[socket.id], 'user ' + oldname + ' modified his nickname to ' + nickname)
    io.emit('online refresh', onlineUsers);
  });

  socket.on('private message', function (sId, msg) {
    userSockets[sId].emit('chat message', "(" + onlineUsers[socket.id] + " 悄悄话 我)", msg);
  });
//------------optimize--------------
  onlineUsers = {};
  socket.on("message", function (message) {
    var mData = lib.analyzeMessageData(message);
    if (mData && mData.EVENT) {
      switch (mData.EVENT) {
        case EVENT_TYPE.LOGIN: // 新用户连接
          var newUser = {'uid': socket.id, 'nick': chatLib.getMsgFirstDataValue(mData)};

          // 把新连接的用户增加到在线用户列表
          onlineUsers[socket.id, newUser];

          // 把新用户的信息广播给在线用户
          var data = JSON.stringify({
            'user': onlineUsers[socket.id],
            'EVENT': EVENT_TYPE.LOGIN,
            'values': [newUser],
            'users': onlineUsers.values(),
          });
          io.sockets.emit('message', data);//广播
          break;
        case EVENT_TYPE.SPEAK: // 用户发言
          var content = lib.getMsgFirstDataValue(mData);
          var data = JSON.stringify({
            'user': onlineUsers[socket.id],
            'EVENT': EVENT_TYPE.SPEAK,
            'values': [content]
          });
          io.sockets.emit('message', data);
          break;

        case EVENT_TYPE.LOGOUT: // 用户请求退出
          var user = mData.values[0];
          delete onlineUsers[socket.id];
          var data = JSON.stringify({
            'EVENT': EVENT_TYPE.LOGOUT,
            'values': [user]
          });
          io.sockets.emit('message', data);
          break;
        default:
          break;
      }
    } else {
      // 事件类型出错，记录日志，向当前用户发送错误信息
      console.log('desc:message,userId:' + socket.id + ',message:' + message);
      var data = JSON.stringify({
        'uid': socket.id,
        'EVENT': EVENT_TYPE.ERROR
      });
      socket.emit('message', data);
    }
  });
});


http.listen(3000, function () {
  console.log('listening on *:3000');
});


/*
 -Broadcast a message to connected users when someone connects or disconnects
 -Add support for nicknames
 -Don't send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
 -Add '{user} is typing' functionality
 -Show who's online
 -Add private messaging
 Share your improvements!
 */