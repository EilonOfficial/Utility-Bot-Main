exports.run = async function (bot, message) {
  var DiceFace = [":one:", ":two:", ":three:", ":four:", ":five:", ":six:"]
  var rand = DiceFace[Math.floor(Math.random() * DiceFace.length)]
  message.reply("You Rolled: :one: (Please Wait... Generating Number..)").then(() => {
      bot.user.lastMessage.edit(`${message.author}, You Rolled: :two: (Please Wait... Generating Number..)`).then(() => {
        bot.user.lastMessage.edit(`${message.author}, You Rolled: :three: (Please Wait... Generating Number..)`).then(() => {
          bot.user.lastMessage.edit(`${message.author}, You Rolled: :four: (Please Wait... Generating Number..)`).then(() => {
            bot.user.lastMessage.edit(`${message.author}, You Rolled: :five: (Please Wait... Generating Number..)`).then(() =>{
              bot.user.lastMessage.edit(`${message.author}, You Rolled: :six: (Please Wait... Generating Number..)`).then(() => {
                bot.user.lastMessage.edit(`${message.author}, You Rolled: ${rand}`)
    
                                  })
                                })
                              })
                            })
                          })
                        })
}

exports.help = {
  name: "roll",
  description: "Rolls A Die",
  usage: "roll"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0, 
  aliases: [] 
}
