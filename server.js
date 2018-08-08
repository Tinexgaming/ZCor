const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true}); // botnya tidak akan bisa mention @everyone
const config = require("./config.json"); // kita akan menaruh prefix dan token disini
const client = new Discord.Client();
const ytdl = require("ytdl-core");
const request = require("request");
const fs = require("fs");
const tokenfile = require("./token.json");
const getYoutibeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
const moment = require("moment");
const randomPuppy = require('random-puppy');
const YoutubeDL = require('youtube-dl');
const music = require('discord.js-musicbot-addon');
const ms = require("ms");
const superagent = require('superagent');
const sm = require('string-similarity');
client.commands = new Discord.Collection();

let prefix = 'z';

 client.on("ready", () => {
  console.log("ready");
  client.user.setStatus("online");
  client.user.setPresence({ game: { name: `type: zeein.co`, type: 'STREAMING', url: 'https://www.twitch.tv/zeein'}});
 
   
 }); //nga mau
// Command Handler
    fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
  client.commands.set(props.help.name, props);
  });
      
  client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
     if(message.author !== bot.user)
  if(!message.content.startsWith(config.prefix)) return;


  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client,message,args,prefix);

});
      bot.on('message', message => {
    const swearWords = ["fuck","bangsat","tolol","goblok","gblk","goblog","gblg","tai","memek","kontol","hentai","ngentot","coli","col1","bacot","bct", "ngentod", "sat"];
    if( swearWords.some(word => message.content.includes(word)) ) {
        message.delete();
        message.author.send('Hey! That word has been banned, please don\'t use it!');
      }
});

      
      client.on('messageDelete', async (message) => {
    const logs = message.guild.channels.find('name', 'mod-logs');
    const entry = await message.guild.fetchAuditLogs({
        type: 'MESSAGE_DELETE'
    }).then(audit => audit.entries.first())
    let user;
    if (entry.extra.channel.id === message.channel.id && (entry.target.id === message.author.id) && (entry.createdTimestamp > (Date.now() - 5000)) && (entry.extra.count >= 1)) {
        user = entry.executor.username
    } else {
        user = message.author
    }
    const logembed = new Discord.RichEmbed()
        .setAuthor(`${message.author.username}. Deleted Message!`, user.displayAvatarURL)
        .addField('**Message:**', `${message.content}`)
        .addField(`Channel:`, `${message.channel}`)
        .setColor("RANDOM")
         .setFooter('Bot Version 1.0.1.0', 'https://cdn.discordapp.com/avatars/470262272049152021/da5003fde19333b6be7b5cb57fc5c269.png?size=2048')
    
});

});

// Turn on the bot
client.login(tokenfile.token);// Goto .env to insert your bot token :)
