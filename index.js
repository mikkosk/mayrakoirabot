const TeleBot = require('telebot')
const fetch = require('node-fetch')
require('dotenv').config()
botToken = process.env.BOT_TOKEN,
clientId = `Client-ID ${process.env.CLIENT_ID}`
imgur = process.env.IMGUR
const bot = new TeleBot(botToken)

const randomNumber = (listSize) => {
    var number = listSize
    while(number === listSize) {
        number = Math.floor(Math.random() * listSize)
    }
    return number
}

bot.on(['/start'], (msg) => {
    bot.sendMessage(msg.chat.id, 'Hellurei! Pyydä kuvaa mäyräkoirasta /mayrakoira')
})

bot.on(['/mayrakoira'], (msg) => {
    fetch(`https://api.imgur.com/3/album/${imgur}/images`, {
        method: 'GET',
        headers: ({
            Authorization: clientId
        })
    }).then(response => { return response.json() })
    .then((data) => {
        bot.sendPhoto(msg.chat.id, data.data[randomNumber(data.data.length)].link)
    })
})

bot.start()