require("dotenv").config();
const	mcping = require("mcpinger");
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { MessageEmbed } = require('discord.js');
// const	connect = require("./commands/voice");
// const	tc_channel = "838912531245826148";
// const	beta_channel = "839616736328286299";
// const	prefix = "!";
// const	command_handler = require("./commands");
// const { execute } = require("./commands/ping");
const	mc_server = {
	port: 25565,
	version: "Forge: 1.16.5",
};
global.toggle = false;
global.togglejoin = true;
global.is_online = false;
module.exports = client = new Client({intents: [Intents.FLAGS.GUILDS]});
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}
module.exports = ip = process.env.MY_IP;
module.export = e_status = new MessageEmbed()
	.setColor("#ff0080")
	.setTitle("Modpack link")
	.setURL(process.env.MODPACK_URL)
	.addField("Minecraft version", mc_server.version)
	.addField("Infos:", "If the modpack is out of date or seems to not be accurate, tell <@227429963882692608>!")
	.setTimestamp()
	.setFooter(
		"Nyx",
		"https://cdn.discordapp.com/attachments/840208014722990080/845232845912145950/takane_enomoto_10229.jpeg",
	);

client.login(process.env.DISCORD_TOKEN);
client.on("ready", () => {
	console.log("Logged in");
	pingServer(true);
	setInterval(pingServer, 10000);
	// setInterval(connect, 10000);
})

client.on("interactionCreate", async interaction => {
	if (!interaction.isCommand())
		return ;
	const command = client.commands.get(interaction.commandName);
	if (!command)
		return ;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.log(`An error has occured : ${error}`);
		await interaction.reply({content: "There was an error executing that command!", ephemeral: true});
	}
});

// client.on("message", (msg) => {
// 	console.log("received message :" + msg);
// 	args = msg.content.toLowerCase().trim().split(/ +/);
// 	if (args.includes("tg") && (msg.author.id == "227429963882692608" || msg.author.id == "237230995651166209" || msg.author.id == "356080354030911489"))
// 	{
// 		console.log("ui");
// 		msg.author.send(":)");
// 		msg.reply("toi tg");
// 	}
// 	else if (msg.content[0] == '!')
// 	{
// 		args = msg.content.slice(prefix.length).trim().split(/ +/);
// 		console.log("args : " + args);
// 		if (msg.channel.id == tc_channel || msg.channel.id == beta_channel || msg.channel.id == "866431049118908416") {
// 			if (msg.content.startsWith(prefix)) command_handler(msg, args);
// 		}
// 	}
// 	else if (msg.channel.id == beta_channel && msg.content[0] != '!' && msg.author.id != "268380213010890752")
// 		msg.delete();
// });

function changeStatus(status, force) {
	var name;

	if (force || client.presence.status != status) {
		switch (status) {
			case "online":
				name = "server is up owo!";
				break;
			case "dnd":
				name = "server is actually down iwi";
				break;
			default:
				name = "IDK";
				break;
		}
		client.user.setActivity(name);
		client.user.setStatus(status);
	}
}

function pingServer(force = false) {
	mcping
		.java({ host: "localhost", port: mc_server.port, timeout: 5000 })
		.then((res) => {
			global.is_online = true;
			changeStatus("online", force);
		})
		.catch((err) => {
			global.is_online = false;
			console.error(err);
			changeStatus("dnd", force);
		});
}
