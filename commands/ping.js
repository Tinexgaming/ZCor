const Discord = require('discord.js')

exports.run = async (client, message, args, color) => {

    let start = Date.now(); message.channel.send(message.channel.id, 'Pong! ').then(message => { 
    let diff = (Date.now() - start); 
    let API = (client.ping).toFixed(2)
        
        let embed = new Discord.RichEmbed()
        .setTitle(`🔔 Pong!`)
        .setColor(0xff2f2f)
        .addField("📶 Latency", `${diff}ms`, true)
        .addField("💻 API", `${API}ms`, true)
        .setFooter('Bot Version 1.0.1.0', 'https://cdn.discordapp.com/avatars/470262272049152021/da5003fde19333b6be7b5cb57fc5c269.png?size=2048')
        message.edit(embed);
      
    });

}
