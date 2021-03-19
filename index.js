const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'ODIyMTg3NjU4NzcxODI0NzEw.YFOn7Q.uFyQ4gD3bE27ZPIEkv8D3ozod_c'
const parser = require('./almanax-scraper');
const moment = require('moment')
const hook = new Discord.WebhookClient('822481186881536043',"a3ze9oGy_kEnZQ7MzMQfOBfeR9bMGCnOTSyJcnJR3_whgoCvMLnpB2NGLGdTx3hNuOGP" )
let flagMsgDelivered;

client.once('ready', () => {
    console.log('Félicitations, votre bot Discord a été correctement initialisé !');
    flagMsgDelivered = false;
});

client.login(token);


client.on("message", message => {
    if (message.content === "!ping" && message.author.id !== client.user.id) {
        parser.getPage((html) => {
            const data = parser.parsePage(html);
            message.channel.send(data.bonusTitre
                + "\n" + data.bonus
                + "\n" + data.offrande);
        })
    }
})

console.log(client.guilds);


