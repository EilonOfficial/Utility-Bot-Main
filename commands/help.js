const config = require("../config.json");
const Discord = require("discord.js");
const embedcolors = require("../embedcolors.json");
exports.run = async function(bot, message, args) {
  if (args.length < 1) {
    try {
      message.channel.send(message.author.tag + " `I sent you a list of commands.`")
      let perms = bot.elevation(message)
      const commandArray = bot.commands.array();
      while (commandArray.length) {
        const embed = new Discord.RichEmbed();
        const commands = commandArray.splice(0, 25);
        const tcommands = commands.filter(c => c.config.permlevel <= perms && c.config.enabled === true)
        embed.setColor(embedcolors.green_positive)
        embed.setTitle('Commands')
        embed.setDescription(`All available commands. Use ${config.prefix}help <command> for a detailed help. Message will be deleted over 30 minutes.`) // IN THE CORRECT PLACE
        for (const command of tcommands) {
          embed.addField(`${command.help.name}`, `${command.help.description} - Permlevel: ${command.config.permlevel}`);
        }
        message.author.send({
          embed: embed
        }).then(message => {
          message.delete(1800000)
        }).catch(console.error)
      }
    } catch (e) {
      console.error(e.stack)
    }
  } else {
    let perms = bot.elevation(message)
    var can_i;
    let command = args.slice(0).join(" ")
    if (command.length < 1) return;
    if (bot.commands.has(command)) {
      command = bot.commands.get(command);
      if (perms < command.config.permlevel) {
        can_i = "No"
      } else {
        can_i = "Yes"
      }
      const embed = new Discord.RichEmbed()
        .setTitle(`${command.help.name}`)
        .setDescription(`A detailed help for the command: ${command.help.name}`)
        .setColor(embedcolors.green_positive)
        .addField("Name:", command.help.name)
        .addField("Description:", command.help.description)
        .addField("Usage:", config.prefix + command.help.usage)
        .addField("Enabled:", command.config.enabled)
        .addField("Server only:", command.config.guildOnly)
        .addField("Required permission level:", command.config.permlevel)
        .addField("Can I run the command:", can_i)
      message.author.send({
        embed: embed
      }).then(message => {
        message.delete(1800000)
      })
    } else {
      const embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setColor(embedcolors.red)
        .setDescription(`The command "${command}" does not exist.`)
      message.author.send({
        embed: embed
      }).then(message => {
        message.delete(30000)
      })
    }
  }
}

exports.config = {
  enabled: true,
  guildOnly: false,
  permlevel: 0,
  aliases: ["commands", "cmds", "cmd"]
}

exports.help = {
  name: "help",
  description: "Shows help for all commands or for one.",
  usage: 'help [command]'
}
