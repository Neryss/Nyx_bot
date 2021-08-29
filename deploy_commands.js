require("dotenv").config();
const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v9");
const guildID = process.env.TS_GUILD_ID;
const liveGuildID = process.env.LIVE_GUILD_ID;
const token = process.env.DISCORD_TOKEN;
const client_id = process.env.CLIENT_ID;

const commands = [];
const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);
console.log("token " + process.env.DISCORD_TOKEN);

(async () => {
	try {
		await rest.put(
			// Routes.applicationGuildCommands(client_id, guildID),
			// {body: commands},
			Routes.applicationGuildCommands(client_id, liveGuildID),
			{body: commands},
		);
		console.log("Commands registered");
	} catch (err) {
		console.log(err);
	}
})();
