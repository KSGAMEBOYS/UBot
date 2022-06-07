module.exports.run = async (client, message, args) => {

return message.channel.send(`Pong\nFor nerds: **${client.ws.ping}** ms`)

}

module.exports.help = {
    name: "ping"
}