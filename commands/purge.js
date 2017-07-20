exports.run = async function (bot, message) {
    var args = message.content.split(/[ ]+/)
       if(args.length >= 3){
        message.channel.sendMessage('`Please Provide Valid Arguements.`');
    } else {
        var msg;
        if(args.length === 1){
            msg=2;
        } else {
            msg=parseInt(args[1]) + 1;
        }
        message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
    } 
}

exports.help = {
  name: "purge",
  description: "Deletes Messages",
  usage: "purge [Number Of Messages To Delete]"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 2, 
  aliases: ["delete", "clean", "clear", "del", "clr", "cln"] 
}
