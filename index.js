var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");
server.listen(process.env.PORT || 3000);

console.log("Server running");

var arrayChat=[];
var arrayUser=[];
arrayUser.push('Peter');
arrayChat.push('hello');
arrayUser.push('Tom Halland');
arrayChat.push('hi, ai cần giúp giải bài không hiểu không?');

io.sockets.on('connection',function(socket){
	console.log("have devide just connect!");
	//nhan ten data
	// socket.on('client-register-user',function(data){
	// 	if (arrayUser.indexOf(data)==-1) {
	// 		arrayUser.push(data);
	// 		tonTai=false;
	// 		console.log("Server nhan: "+data);
	// 		//gui danh sach user
	// 		socket.un=data;
	// 		io.sockets.emit('server-send-user',{ danhsach : arrayUser });
	// 	}else{
	// 		tonTai=true;
	// 	}
	// 	//chi tra ve 1 may
	// 	socket.emit('server-send-result',{ ketqua : tonTai});

		
	// 	//emit toi moi nguoi
	// 	//io.sockets.emit('sever-send-data',{ noidung : data });
	// });
	socket.on('client-join', function(ten){
		console.log(ten+" da tham gia");
		socket.emit('sever-send-all-chat', { danhsachChat : arrayChat,danhsachUser : arrayUser});
	});

	// socket.on('client-send-chat', function (ten,noidung){
	// 	console.log(noidung + ten);
	// 	arrayChat.push(noidung);
	// 	arrayUser.push(ten);
	// 	io.sockets.emit('server-send-chat', { danhsachChat : arrayChat, danhsachUser : arrayUser} );
	// });

	socket.on('client_send_chat', function(testchat, name){
		console.log(name+"  "+testchat);
		arrayUser.push(name);
		arrayChat.push(testchat);
		io.sockets.emit('sever-send-new-chat', { danhsachChat : arrayChat, danhsachUser : arrayUser} );
	});	

});