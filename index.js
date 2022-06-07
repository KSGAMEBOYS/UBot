//Required stuff importeren
const { Intents, Collection } = require("discord.js");
const discord = require("discord.js")
const botConfig = require("./botConfig.json");

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require("fs")

//client registreren
const client = new discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//command handler
client.commands = new Collection();

const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.help.name, command);

    console.log(`the normal command: ${command.help.name} is loaded!`);

}



//MessageCreate Event handlen

client.once("ready", () => {

    console.log(`${client.user.username} is online`);

})

client.on("messageCreate", async message => {

    if (message.author.bot) return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) return;

    const commandData = client.commands.get(command.slice(prefix.length));

    if (!commandData) return;

    var arguments = messageArray.slice(1);

    try {

        await commandData.run(client, message, arguments);

    } catch (error) {
        console.log(error);
        await message.reply("there is a problem index.js:40.")
    }
})


//Client login token
client.login(botConfig.token);


//default setup:
// module.exports.run = async(client, message, args) => {

// return message.channel.send("hallo")
//}

// module.exports.help = {
 //   name: "hallo"
//}