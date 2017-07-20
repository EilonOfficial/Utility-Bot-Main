const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");
const embedcolors = require("./embedcolors.json")
const strikes = require("./data/strikes.json")
const kicks = require("./data/kicks.json")
const bans = require("./data/bans.json")
var no_perms = config.no_perms; // Message to send when someone doesn't have the permissions to run the command.
bot.tempbans = require("./data/tempbans.json")
bot.tempmutes = require("./data/tempmutes.json")

bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()

function pluck(array) {
    return array.map(function(item){ return item["name"];})
}
function hasRole(mem, role){
    if(pluck(mem.roles).includes(role)){
        return true;
    } else {
        return false;
    }
}

bot.elevation = message => {
  var permlevel = 0;
  if(!message.guild) return;
  if(hasRole(message.member, "Jr. Helper")) permlevel = 1;
  if(hasRole(message.member, "Helper")) permlevel = 2;
  if(hasRole(message.member, "Moderator")) permlevel = 4;
  if(hasRole(message.member, "Administrators")) permlevel = 6;
  if(hasRole(message.member, "Owner")) permlevel = 8;
  if(message.member.hasPermission("ADMINISTRATOR")) permlevel = 6;
  if(message.author.id === message.guild.owner.id) permlevel = 8;
  if(config.developers.includes(message.author.id)) permlevel = 12;
  if(config.owners.includes(message.author.id)) permlevel = 20;
  if(message.author.id === config.creator) permlevel = 100000000;
  return permlevel;
}; // The permission level we are going to use for the commands.


bot.on("ready", () => {
  fs.readdir("./commands", (err, files) => {
    if(err) console.error(err);
    console.log(`Loading a total of ${files.length} commands!`);
    files.forEach(filename => {
      let props = require(`./commands/${filename}`);
      bot.commands.set(props.help.name, props);
      props.config.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
      });
    });
  });
  console.log("Online and ready!")
  console.log(`Serving a total of ${bot.guilds.size} servers and ${bot.users.size} users.`)
  bot.setInterval(() => {
    for(var i in bot.tempbans)
         if(i !== undefined){
      var time = bot.tempbans[i].time;
      var guildId = bot.tempbans[i].guild;
      var guild = bot.guilds.get(guildId)
      if(Date.now() > time) {
        guild.unban(i)
        guild.channels.find("name", "general").send(`<@${i}>'s Tempban Has Ended`)
        delete bot.tempbans[i]
        fs.writeFile("./data/tempbans.json", JSON.stringify(bot.tempbans))
      }
    }
  }, 5000)
  bot.setInterval(() => {
        for(var i in bot.tempmutes)
         if(i !== undefined){
      var time = bot.tempmutes[i].time;
      var guildId = bot.tempmutes[i].guild;
      var name = bot.tempmutes[i].name
      var guild = bot.guilds.get(guildId)
      if(Date.now() > time) {
        guild.members.get(name).addRole(guild.roles.find("name", "Member"))
        guild.members.get(name).removeRole(guild.roles.find("name", "Muted"))
        const embed = new Discord.RichEmbed()
        .setAuthor("User UnMuted:", guild.members.get(name).user.displayAvatarURL)
        .setThumbnail(guild.members.get(name).user.displayAvatarURL)
        .setColor(embedcolors.green_positive)
        .setFooter("User UnMuted")
        .addField("Reason:", "Temperary Mute Expired.")
        guild.channels.find("name", "logs").send({embed})
        delete bot.tempmutes[i]
        fs.writeFile("./data/tempmutes.json", JSON.stringify(bot.tempmutes))
      }
    }
  }, 5000)
}); // Ready event: when the bot gets online.


bot.on("message", message => {
  if(message.content === "+setup"){
    message.guild.createEmoji('http://www.clker.com/cliparts/w/d/1/K/l/p/dice-1-md.png', 'diceface1')
 .then(emoji => console.log(`Created new emoji with name ${emoji.name}!`))
 .catch(console.error);
     message.guild.createEmoji('http://www.clker.com/cliparts/a/Y/E/o/z/t/dice-2-md.png', 'diceface2')
 .then(emoji => console.log(`Created new emoji with name ${emoji.name}!`))
 .catch(console.error);
      message.guild.createEmoji('http://www.clker.com/cliparts/M/e/P/O/L/b/dice-3.svg', 'diceface3')
 .then(emoji => console.log(`Created new emoji with name ${emoji.name}!`))
 .catch(console.error);
       message.guild.createEmoji('http://www.clker.com/cliparts/r/z/d/a/L/V/dice-4-hi.png', 'diceface4')
 .then(emoji => console.log(`Created new emoji with name ${emoji.name}!`))
 .catch(console.error);
        message.guild.createEmoji('https://3dr.com/wp-content/uploads/2017/03/dice-5.png', 'diceface5')
 .then(emoji => console.log(`Created new emoji with name ${emoji.name}!`))
 .catch(console.error);
         message.guild.createEmoji('http://www.clker.com/cliparts/l/6/4/3/K/H/dice-6-hi.png', 'diceface6')
 .then(emoji => console.log(`Created new emoji with name ${emoji.name}!`))
 .catch(console.error);
  }
  let prefix;
  if(message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  let command = message.content.toLowerCase().split(' ')[0].slice(config.prefix.length);
  let perms = bot.elevation(message);
  let args = message.content.split(' ').slice(1);
  let cmd;

  if (bot.commands.has(command)) {
  cmd = bot.commands.get(command);
  } else if (bot.aliases.has(command)) {
  cmd = bot.commands.get(bot.aliases.get(command));
  }
  if(!cmd) return;
    if (cmd) {
      if (perms < cmd.config.permlevel) {
        if(!message.guild && perms < cmd.config.permlevel) return message.channel.send(no_perms)
        message.author.send(no_perms)
      } else {
        if(cmd.config.enabled === false) return message.channel.send("```" + `The command ${command} is disabled by the developers.` + "```")
        if(cmd.config.guildOnly === true && !message.guild) return message.channel.send("```Error: This command is only available in a server.```")
        cmd.run(bot, message, args, perms);
        console.log(`The command ${command} was ran by ${message.author.tag}`);
      }
    }
}); // Command handler.

const yt = require('ytdl-core');
const tokens = require('./tokens.json');

let queue = {};

const commands = {
	'play': (msg) => {
		if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`Add some songs to the queue first with ${tokens.prefix}add`);
		if (!msg.guild.voiceConnection) return commands.join(msg).then(() => commands.play(msg));
		if (queue[msg.guild.id].playing) return msg.channel.sendMessage('Already Playing');
		let dispatcher;
		queue[msg.guild.id].playing = true;

		console.log(queue);
		(function play(song) {
			console.log(song);
			if (song === undefined) return msg.channel.sendMessage('Queue is empty').then(() => {
				queue[msg.guild.id].playing = false;
				msg.member.voiceChannel.leave();
			});
			msg.channel.sendMessage(`Playing: **${song.title}** as requested by: **${song.requester}**`);
			dispatcher = msg.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : tokens.passes });
			let collector = msg.channel.createCollector(m => m);
			collector.on('message', m => {
				if (m.content.startsWith(tokens.prefix + 'pause')) {
          if(hasRole(msg.member, "DJ")){
          msg.channel.sendMessage('paused').then(() => {dispatcher.pause();});
          } else message.channel.send(config.no_perms)
				} else if (m.content.startsWith(tokens.prefix + 'resume')){
					msg.channel.sendMessage('resumed').then(() => {dispatcher.resume();});
				} else if (m.content.startsWith(tokens.prefix + 'skip')){
          if(hasRole(msg.member, "DJ")){
          msg.channel.sendMessage('skipped').then(() => {dispatcher.end();});
          }
				} else if (m.content.startsWith('volume+')){
          if(hasRole(msg.member, "DJ")){
					if (Math.round(dispatcher.volume*50) >= 100) return msg.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
					dispatcher.setVolume(Math.min((dispatcher.volume*50 + (2*(m.content.split('+').length-1)))/50,2));
          msg.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
          } else msg.channel.send(config.no_perms)
				} else if (m.content.startsWith('volume-')){
          if(hasRole(msg.member, "DJ")){
					if (Math.round(dispatcher.volume*50) <= 0) return msg.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
					dispatcher.setVolume(Math.max((dispatcher.volume*50 - (2*(m.content.split('-').length-1)))/50,0));
          msg.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
          } else msg.channel.send(config.no_perms)
				} else if (m.content.startsWith(tokens.prefix + 'time')){
					msg.channel.sendMessage(`time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`);
				} else if (m.content.startsWith(tokens.prefix + 'stop')){
          if(hasRole(msg.member, "DJ")){
          dispatcher.end()
          }
        }
			});
			dispatcher.on('end', () => {
				collector.stop();
				play(queue[msg.guild.id].songs.shift());
			});
			dispatcher.on('error', (err) => {
				return msg.channel.sendMessage('error: ' + err).then(() => {
					collector.stop();
					play(queue[msg.guild.id].songs.shift());
				});
			});
		})(queue[msg.guild.id].songs.shift());
	},
	'join': (msg) => {
		return new Promise((resolve, reject) => {
			const voiceChannel = msg.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('I couldn\'t connect to your voice channel...');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
		});
	},
	'addqueue': (msg) => {
		let url = msg.content.split(' ')[1];
		if (url == '' || url === undefined) return msg.channel.sendMessage(`You must add a YouTube video url, or id after ${tokens.prefix}add`);
		yt.getInfo(url, (err, info) => {
			if(err) return msg.channel.sendMessage('Invalid YouTube Link: ' + err);
			if (!queue.hasOwnProperty(msg.guild.id)) queue[msg.guild.id] = {}, queue[msg.guild.id].playing = false, queue[msg.guild.id].songs = [];
			queue[msg.guild.id].songs.push({url: url, title: info.title, requester: msg.author.username});
			msg.channel.sendMessage(`added **${info.title}** to the queue`);
		});
	},
	'queue': (msg) => {
		if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`Add some songs to the queue first with ${tokens.prefix}add`);
		let tosend = [];
		queue[msg.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);});
		msg.channel.sendMessage(`__**${msg.guild.name}'s Music Queue:**__ Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
  },
};

bot.on('ready', () => {
	console.log('ready!');
});

bot.on('message', msg => {
	if (!msg.content.startsWith(tokens.prefix)) return;
	if (commands.hasOwnProperty(msg.content.toLowerCase().slice(tokens.prefix.length).split(' ')[0])) commands[msg.content.toLowerCase().slice(tokens.prefix.length).split(' ')[0]](msg);
});



bot.on("guildMemberAdd", (member) => {
  member.send(`Welcome To ${member.guild}'s Server Please Read Over The Guidelines And Have A Nice Time! Once You Have Read Over The Guidelines Type "${config.prefix}agree" In <#${member.guild.channels.find("name", "guests").id}>, if you do not see a channel called #guests, that means that Anti-Raid Is Disabled. In That Case Do Not Worry About ${config.prefix}agree`)
  member.addRole(member.guild.roles.find("name", "Member"))
  member.guild.channels.find("name", config.MainChat).send(`${member} Thank you for choosing ${member.guild}! Hope you have a good time! And if you havent already, please read over our rules in <#${member.guild.channels.find("name", "guidelines").id}>`)
    function getkicks(){
        let userid = member.id
      if(!userid) {
        let list = Object.keys(kicks);
        let found = '';
        let foundCounter = 0;
        let warnCase;
        //looking for the case id
        for (let i = 0; i < list.length; i++) {
            if (kicks[list[i]].user.id === member.id && kicks[list[i]].server.id === member.guild.id) {
                foundCounter++;
                found += `Case ID: ${(kicks[list[i]].kick.caseid)}\nUsername: ${kicks[list[i]].user.name}#${kicks[list[i]].user.discrim}\nAdmin: ${kicks[list[i]].admin.name}#${kicks[list[i]].admin.discrim}\nServer: ${kicks[list[i]].server.name}\nReason: ${kicks[list[i]].reason}\n\n`;
            }
        }
        if (foundCounter == 0) findkicks = ("No kicks found for that user")
        if(foundCounter > 0) findkicks = ("Found " + foundCounter + " kick(s).\n```" + found + "```");
      }
      if(!member.guild.members.has(userid)) return;
      let list = Object.keys(kicks);
      let found = '';
      let foundCounter = 0;
      let warnCase;
      //looking for the case id
      for (let i = 0; i < list.length; i++) {
          if (kicks[list[i]].user.id === userid && kicks[list[i]].server.id === member.guild.id) {
              foundCounter++;
              found += `Case ID: ${(kicks[list[i]].kick.caseid)}\nUsername: ${kicks[list[i]].user.name}#${kicks[list[i]].user.discrim}\nAdmin: ${kicks[list[i]].admin.name}#${kicks[list[i]].admin.discrim}\nServer: ${kicks[list[i]].server.name}\nReason: ${kicks[list[i]].reason}\n\n`;
          }
      }
      if (foundCounter == 0) findkicks = ("No kicks found for that user")
      if(foundCounter > 0) findkicks = ("Found " + foundCounter + " kick(s).\n```" + found + "```");
}
function getStrikes(){
   let userid = member.id
      if(!userid) {
        let list = Object.keys(strikes);
        let found = '';
        let foundCounter = 0;
        let warnCase;
        //looking for the case id
        for (let i = 0; i < list.length; i++) {
            if (strikes[list[i]].user.id === member.id && strikes[list[i]].server.id === member.guild.id) {
                foundCounter++;
                found += `Case ID: ${(strikes[list[i]].kick.caseid)}\nUsername: ${strikes[list[i]].user.name}#${strikes[list[i]].user.discrim}\nAdmin: ${strikes[list[i]].admin.name}#${strikes[list[i]].admin.discrim}\nServer: ${strikes[list[i]].server.name}\nReason: ${strikes[list[i]].reason}\n\n`;
            }
        }
        findstrikes = ("Found " + foundCounter + " strike(s).\n```" + found + "```")
        if (foundCounter == 0) findstrikes = ("No strikes found for that user")
      }
      if(!member.guild.members.has(userid)) return;
      let list = Object.keys(strikes);
      let found = '';
      let foundCounter = 0;
      let warnCase;
      //looking for the case id
      for (let i = 0; i < list.length; i++) {
          if (strikes[list[i]].user.id === userid && strikes[list[i]].server.id === member.guild.id) {
              foundCounter++;
              found += `Case ID: ${(strikes[list[i]].kick.caseid)}\nUsername: ${strikes[list[i]].user.name}#${strikes[list[i]].user.discrim}\nAdmin: ${strikes[list[i]].admin.name}#${strikes[list[i]].admin.discrim}\nServer: ${strikes[list[i]].server.name}\nReason: ${strikes[list[i]].reason}\n\n`;
          }
      }
      findstrikes = ("Found " + foundCounter + " strike(s).\n```" + found + "```");
      if (foundCounter == 0) findstrikes = ("No strikes found for that user")
}
function getBans(){
  let userid = member.id
      if(!userid) {
        let list = Object.keys(bans);
        let found = '';
        let foundCounter = 0;
        let warnCase;
        //looking for the case id
        for (let i = 0; i < list.length; i++) {
            if (bans[list[i]].user.id === member.id && bans[list[i]].server.id === member.guild.id) {
                foundCounter++;
                found += `Case ID: ${(bans[list[i]].ban.caseid)}\nUsername: ${bans[list[i]].user.name}#${bans[list[i]].user.discrim}\nAdmin: ${bans[list[i]].admin.name}#${bans[list[i]].admin.discrim}\nServer: ${bans[list[i]].server.name}\nReason: ${bans[list[i]].reason}\n\n`;
            }
        }
        if (foundCounter == 0) findBans = ("No bans found for that user")
        if(foundCounter > 0) findBans = ("Found " + foundCounter + " ban(s).\n```" + found + "```");
      }
      if(!member.guild.members.has(userid)) return;
      let list = Object.keys(bans);
      let found = '';
      let foundCounter = 0;
      let warnCase;
      //looking for the case id
      for (let i = 0; i < list.length; i++) {
          if (bans[list[i]].user.id === userid && bans[list[i]].server.id === member.guild.id) {
              foundCounter++;
              found += `Case ID: ${(bans[list[i]].ban.caseid)}\nUsername: ${bans[list[i]].user.name}#${bans[list[i]].user.discrim}\nAdmin: ${bans[list[i]].admin.name}#${bans[list[i]].admin.discrim}\nServer: ${bans[list[i]].server.name}\nReason: ${bans[list[i]].reason}\n\n`;
          }
      }
      if (foundCounter == 0) findBans = ("No bans found for that user")
      if(foundCounter > 0) findBans = ("Found " + foundCounter + " ban(s).\n```" + found + "```");
}
getStrikes()
getkicks()
getBans()
  const embed = new Discord.RichEmbed()
.setAuthor("Member Joined", member.user.displayAvatarURL)
.setColor(embedcolors.green_positive)
.setThumbnail(member.user.displayAvatarURL)
.setFooter(`Member Joined | Find More Info With: ${config.prefix}info @${member.user.username}#${member.user.discriminator}`)
.setTimestamp(member.joinedAt)
.addField("Mention:", member)
.addField("Tag:", member.user.tag)
.addField("Username:", member.user.username)
.addField("Discriminator", `#${member.user.discriminator}`)
.addField("UserID:", member.id)
.addField("---Previous Punishments---", "Punishments:")
.addField("Strikes:", findstrikes)
.addField("Kicks:", findkicks)
.addField("Bans:", findBans)
member.guild.channels.find("name", config.Log_Channel).send({embed})
}); //Join Handler

bot.on("guildMemberRemove", (member) => {
  const embed = new Discord.RichEmbed()
.setAuthor("Member Left", member.user.displayAvatarURL)
.setThumbnail(member.user.displayAvatarURL)
.setFooter("Member Left")
.setColor(embedcolors.green_positive)
.addField("Mention:", member)
.addField("Tag:", member.user.tag)
.addField("Username:", member.user.username)
.addField("Discriminator:", `#${member.user.discriminator}`)
member.guild.channels.find("name", config.Log_Channel).send({embed})
});

bot.on("guildBanAdd", (guild,user) => {
bot.guilds.get(guild.id).channels.find("name", "general").send(`${user} Has Been Banned From The Server 👌`)
bot.guilds.get(guild.id).channels.find("name", "logs").send(`${user} Has Been Banned From The Server 👌`)
});

bot.on("messageDelete", (message) => {
if(message.author !== bot.user){
const embed = new Discord.RichEmbed()
.setColor(embedcolors.orange_warn)
.setFooter("Message Deleted")
.setTimestamp(message.createdAt)
.addField("Message Author:", message.author)
.addField("Deleted Message Content:", message.content)
bot.guilds.get(message.guild.id).channels.find("name", "logs").send({embed})
}
});

bot.on("roleCreate", (role) => {
const embed = new Discord.RichEmbed()
.setColor(embedcolors.green_positive)
.setFooter("Role Created")
.setTimestamp(role.createdAt)
.addField("Role Created:", role.name)
bot.guilds.get(role.guild.id).channels.find("name", "logs").send({embed})
});

bot.on("roleDelete", (role) => {
const embed = new Discord.RichEmbed()
.setColor(embedcolors.green_positive)
.setFooter("Role Created")
.addField("Role Deleted", role.name)
bot.guilds.get(role.guild.id).channels.find("name", "logs").send({embed})
});

bot.login(config.token) // Logins to your bot account with the set token in the config file.