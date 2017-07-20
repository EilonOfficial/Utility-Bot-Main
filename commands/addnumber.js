exports.run = async function (bot, message) {
     const Discord = require("discord.js");
     const embedcolors = require("../embedcolors.json");
     const args = message.content.split(/\s+/g).slice(1);
    if(args.length < 4){
        message.channel.send('Invalid Arguments. Usage: **+addnumber [Number (Must Not Contain Spaces) ] | [Website (Must Not Contain Spaces) ] | [Description (May Contain Spaces) ]**')
    } else {
      if(args.length === 5){
      var Number = args[0]
      var Website = args[2]
      var Type = args[4]
      var embed = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setColor(embedcolors.green_positive)
      .setFooter("To Submit Scammer Info Type: `+addnumber [Number (Must Not Contain Spaces) ] [Website (Must Not Contain Spaces) ] [Description (May Contain Spaces) ]`")
      .addField("New Scammer Info Submitted By:", message.author)
      .addField("Number", Number)
      .addField("Website", Website)
      .addField("Description", Type)

      message.guild.channels.find("name", "scammer_numbers").send({embed})
} else {
  if(args.length === 6){
          var Number = args[0]
      var Website = args[2]
      var Type = args[4] + " " + args[5]
      var embed = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setColor(embedcolors.green_positive)
      .setFooter("To Submit Scammer Info Type: `+addnumber [Number (Must Not Contain Spaces) ] [Website (Must Not Contain Spaces) ] [Description (May Contain Spaces) ]`")
      .addField("New Scammer Info Submitted By:", message.author)
      .addField("Number", Number)
      .addField("Website", Website)
      .addField("Description", Type)
      message.guild.channels.find("name", "scammer_numbers").send({embed})
  } else {
      if(args.length === 7){
          var Number = args[0]
      var Website = args[2]
      var Type = args[4] + " " + args[5] + " " + args[6]
      var embed = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setColor(embedcolors.green_positive)
      .setFooter("To Submit Scammer Info Type: `+addnumber [Number (Must Not Contain Spaces) ] [Website (Must Not Contain Spaces) ] [Description (May Contain Spaces) ]`")
      .addField("New Scammer Info Submitted By:", message.author)
      .addField("Number", Number)
      .addField("Website", Website)
      .addField("Description", Type)
      message.guild.channels.find("name", "scammer_numbers").send({embed})
  } else {
        if(args.length === 8){
          var Number = args[0]
      var Website = args[2]
      var Type = args[4] + " " + args[5] + " " + args[6] + " " +args[7]
      var embed = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setColor(embedcolors.green_positive)
      .setFooter("To Submit Scammer Info Type: `+addnumber [Number (Must Not Contain Spaces) ] [Website (Must Not Contain Spaces) ] [Description (May Contain Spaces) ]`")
      .addField("New Scammer Info Submitted By:", message.author)
      .addField("Number", Number)
      .addField("Website", Website)
      .addField("Description", Type)
      message.guild.channels.find("name", "scammer_numbers").send({embed})
  } else {
         if(args.length === 9){
          var Number = args[0]
      var Website = args[2]
      var Type = args[4] + " " + args[5] + " " + args[6] + " " +args[7] + " " +args[8]
      var embed = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setColor(embedcolors.green_positive)
      .setFooter("To Submit Scammer Info Type: `+addnumber [Number (Must Not Contain Spaces) ] [Website (Must Not Contain Spaces) ] [Description (May Contain Spaces) ]`")
      .addField("New Scammer Info Submitted By:", message.author)
      .addField("Number", Number)
      .addField("Website", Website)
      .addField("Description", Type)
      message.guild.channels.find("name", "scammer_numbers").send({embed})
  } else {
         if(args.length === 10){
          var Number = args[0]
      var Website = args[2]
      var Type = args[4] + " " + args[5] + " " + args[6] + " " +args[7] + " " + args[8] + " " + args[9]
      var embed = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setColor(embedcolors.green_positive)
      .setFooter("To Submit Scammer Info Type: `+addnumber [Number (Must Not Contain Spaces) ] [Website (Must Not Contain Spaces) ] [Description (May Contain Spaces) ]`")
      .addField("New Scammer Info Submitted By:", message.author)
      .addField("Number", Number)
      .addField("Website", Website)
      .addField("Description", Type)
      message.guild.channels.find("name", "scammer_numbers").send({embed})
  } else {
          if(args.length === 11){
          var Number = args[0]
      var Website = args[2]
      var Type = args[4] + " " + args[5] + " " + args[6] + " " +args[7] + " " + args[8] + " " + args[9] + " " + args[10]
      var embed = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setColor(embedcolors.green_positive)
      .setFooter("To Submit Scammer Info Type: `+addnumber [Number (Must Not Contain Spaces) ] [Website (Must Not Contain Spaces) ] [Description (May Contain Spaces) ]`")
      .addField("New Scammer Info Submitted By:", message.author)
      .addField("Number", Number)
      .addField("Website", Website)
      .addField("Description", Type)
      message.guild.channels.find("name", "scammer_numbers").send({embed})
  } else {
    message.channel.send('Error: Contains Too Many Spaces')
  }
  }
  }
  }
  }
} 
}
}
}

exports.help = {
  name: "addnumber",
  description: "Adds A Scammer Number To #scammer_numbers",
  usage: "addnumber [Number (Must Not Contain Spaces) ] [Website (Must Not Contain Spaces) ] [Description (May Contain Spaces) ]"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0, 
  aliases: [] 
}
