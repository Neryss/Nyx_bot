require('dotenv').config();
const	mcping = require('mcpinger');
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const	connect = require('./old_commands/connect');
const	ban_word = require('./lib/ban_word');
global.mc_server = {
	port: 25565,
	version: '0.5.14',
};
global.e_status = new MessageEmbed()
	.setColor('#ff0080')
	.setTitle('Modpack link')
	.setDescription("bit")
	.setURL(process.env.MODPACK_URL)
	.addField('Modpack version', global.mc_server.version)
	.addField('Infos:', 'If the modpack is out of date or seems to not be accurate, tell <@227429963882692608>!')
	.setTimestamp()
	.setFooter(
	'Nyx',
	'https://cdn.discordapp.com/attachments/840208014722990080/845232845912145950/takane_enomoto_10229.jpeg',
);
global.toggle = true;
global.togglejoin = true;
global.is_online = false;
global.vc_id = null;
global.guild_id = null;
module.exports = client = new Client({intents: [Intents.FLAGS.GUILDS, 'GUILD_MESSAGES']});
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}
module.exports = ip = process.env.MY_IP;

client.login(process.env.DISCORD_TOKEN);
client.on('ready', () => {
	console.log('Logged in');
	pingServer(true);
	setInterval(pingServer, 10000);
	// setInterval(connect, 10000);
	connect();
})

client.on('interactionCreate', async interaction => {
	console.log('interact');
	if (!interaction.isCommand())
		return ;
	const command = client.commands.get(interaction.commandName);
	if (!command)
		return ;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.log(`An error has occured : ${error}`);
		await interaction.editReply({content: 'There was an error executing that command!', ephemeral: true});
	}
});

client.on('messageCreate', (msg) => {
	console.log('received message :' + msg);
	args = msg.content.toLowerCase().trim().split(/ +/);
	tmp = ban_word.getValue(msg.content);
	console.log(tmp)
	if (msg.author.id != "268380213010890752" && tmp != -1)
		msg.reply("```" + tmp + "```");
	if (args.includes('tg') && (msg.author.id == '227429963882692608' || msg.author.id == '237230995651166209' || msg.author.id == '356080354030911489' || msg.author.id == '227429963882692608'))
	{
		msg.author.send(':)');
		msg.reply('toi tg');
	}
});

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
		.java({ host: "neryss.pw", port: mc_server.port, timeout: 5000 })
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
